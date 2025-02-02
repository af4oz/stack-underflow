import { CommentParentType, Resolvers, VoteType } from "src/server/__generated__/resolvers-types";
import { getChangedTags } from "src/server/utils";
import authChecker from "src/server/utils/authChecker";
import { JWT_SECRET } from "src/server/utils/config";
import {
  registerValidator,
  loginValidator,
  questionValidator,
} from "src/server/utils/validators";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Context } from "./context";
import { GraphQLError } from "graphql";

const mutationResolvers: Resolvers["Mutation"] = {
  register: async (parent, { username, password }, c: Context) => {
    const { errors, valid } = registerValidator(username, password);

    if (!valid) {
      return Promise.reject(new GraphQLError(Object.values(errors)[0] as string));
    }

    const existingUser = await c.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUser) {
      return Promise.reject(new GraphQLError(`Username '${username}' is already taken.`));
    }

    const saltRounds = 10;
    // const passwordHash = await bcrypt.hash(password, saltRounds); // TODO
    const passwordHash = password; // TODO

    const savedUser = await c.prisma.user.create({
      data: {
        username,
        passwordHash,
      },
    });

    const token = jwt.sign(
      {
        id: savedUser.id,
      },
      JWT_SECRET as string
    );

    return {
      id: savedUser.id.toString(),
      username: savedUser.username,
      role: savedUser.role,
      token,
    };
  },
  login: async (parent, { username, password }, c: Context) => {
    const { errors, valid } = loginValidator(username, password);

    if (!valid) {
      // throw new UserInputError(Object.values(errors)[0], { errors });
      return Promise.reject(new GraphQLError(Object.values(errors)[0]));
    }

    const user = await c.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return Promise.reject(new GraphQLError(`User: '${username}' not found.`))
      // throw new UserInputError(`User: '${username}' not found.`);
    }

    // const credentialsValid = await bcrypt.compare(password, user.passwordHash);
    const credentialsValid = password === user.passwordHash;

    if (!credentialsValid) {
      // throw new UserInputError("Invalid credentials.");
      return Promise.reject(new GraphQLError("Invalid credentials."))
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      JWT_SECRET as string
    );

    return {
      id: user.id.toString(),
      username: user.username,
      role: user.role,
      token,
    };
  },
  postQuestion: async (parent, { title, body, tags }, c: Context) => {
    const loggedUser = authChecker(c);

    const { errors, valid } = questionValidator(title, body, tags);
    if (!valid) {
      // throw new UserInputError(Object.values(errors)[0], { errors });
      return Promise.reject(new GraphQLError(Object.values(errors)[0]));
    }

    try {
      const author = await c.prisma.user.findFirst({
        where: {
          id: loggedUser.id
        }
      });

      if (!author) {
        // throw new UserInputError(
        //   `User with ID: ${loggedUser.id} does not exist!`
        // );
        return Promise.reject(new GraphQLError(`User with ID: ${loggedUser.id} does not exist!`));
      }
      const savedQues = await c.prisma.question.create({
        data: {
          title,
          body,
          tags,
          authorId: author.id,
          // answers: [],
          // comments: [],
        },
        include: {
          author: true,
          // author: {
          //   select: {
          //     id: true,
          //     username: true,
          //   },
          // },
        },
      });

      // update tags collection
      await Promise.all(
        tags.map(async (tag) => {
          await c.prisma.tag.upsert({
            where: {
              name: tag,
            },
            update: {
              name: tag,
            },
            create: {
              name: tag,
            },
          });
        })
      );
      // const populatedQues = await savedQues.populate("author", "username");

      return savedQues as any; // TODO: Fix this type
    } catch (err) {
        return Promise.reject(err);
    }
  },
  deleteQuestion: async (parent, { quesId }, c: Context) => {
    const loggedUser = authChecker(c);

    try {
      const user = await c.prisma.user.findFirst(loggedUser.id);
      if (!user) {
        return Promise.reject(new GraphQLError(`User with ID: ${loggedUser.id} does not exist!`));
      }
      const question = await c.prisma.question.delete({
        where: {
          id: quesId,
        },
      });
      if (!question) {
        // throw new UserInputError(`Question with ID: ${quesId} does not exist!`)
        return Promise.reject(new GraphQLError(`Question with ID: ${quesId} does not exist!`));
      }
      if (question.authorId.toString() !== user.id.toString()) {
        // throw new ForbiddenError("You can not delete other's question!")
        return Promise.reject(new GraphQLError("You can not delete other's question!"));
      }

      // update tags collection
      await Promise.all(
        question.tags.map(async (tag) => {
          await c.prisma.tag.update({
            where: {
              name: tag,
            },
            data: {
              questionCount: {
                decrement: 1,
              },
            },
          });
        })
      );
      // await question.delete();

      return quesId;
    } catch (err) {
        return Promise.reject(err);
    }
  },
  editQuestion: async (parent, { quesId, title, body, tags }, c: Context) => {
    const loggedUser = authChecker(c);

    const { errors, valid } = questionValidator(title, body, tags);
    if (!valid) {
      // throw new UserInputError(Object.values(errors)[0], { errors });
      return Promise.reject(new GraphQLError(Object.values(errors)[0]));
    }

    const updatedQuesObj = {
      title,
      body,
      tags,
      updatedAt: new Date(),
    };

    try {
      const question = await c.prisma.question.findFirst({
        where: {
          id: quesId,
        },
      });
      if (!question) {
        return Promise.reject(new GraphQLError(`Question with ID: ${quesId} does not exist!`));
      }
      if (question.authorId.toString() !== loggedUser.id.toString()) {
        return Promise.reject(new GraphQLError("You can not edit other's question!"));
      }

      const changedTags = getChangedTags(question.tags, tags);

      await Promise.all(
        changedTags.added.map(async (tag) => {
          await c.prisma.tag.upsert({
            where: {
              name: tag,
            },
            update: {
              questionCount: {
                increment: 1,
              },
            },
            create: {
              name: tag,
            },
          });
        })
      );
      await Promise.all(
        changedTags.removed.map(async (tag) => {
          await c.prisma.tag.update({
            where: {
              name: tag,
              questionCount: {
                gt: 0,
              },
            },
            data: {
              questionCount: {
                decrement: 1,
              },
            },
          });
        })
      );
      const updatedQues = await c.prisma.question.update({
        where: {
          id: quesId,
        },
        data: updatedQuesObj,
        include: {
          comments: true, 
          author: {
            select: {
              id: true,
              username: true,
            },
          },
          answers: {
            include: {
              comments: true, 
              author: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
          },
        },
      });

      if (!updatedQues) {
        return Promise.reject(new GraphQLError(`something went wrong!`));
      }
      return updatedQues as any; // TODO: Fix this type;
    } catch (err) {
        return Promise.reject(err);
    }
  },
  voteQuestion: async (parent, { quesId, voteType }, c: Context) => {
    const loggedUser = authChecker(c);

    // TODO : use transactions
    try {
      const user = await c.prisma.user.findFirst({
        where: {
          id: loggedUser.id,
        },
      });

      if (!user) {
        // throw new UserInputError(
        //   `User with ID: ${loggedUser.id} does not exist!`
        // )
        return Promise.reject(new GraphQLError(`User with ID: ${loggedUser.id} does not exist!`));
      }
      const question = await c.prisma.question.findFirst({
        where: {
          id: quesId,
        },
      });
      if (!question) {
        // throw new UserInputError(`Question with ID: ${quesId} does not exist!`)
        return Promise.reject(new GraphQLError(`Question with ID: ${quesId} does not exist!`));
      }

      if (question.authorId.toString() === user.id.toString()) {
        // throw new ForbiddenError("You can't vote for your own post.")
        return Promise.reject(new GraphQLError("You can't vote for your own post."));
      }

      const quesAuthor = await c.prisma.user.findFirst({
        where: {
          id: question.authorId,
        },
      });
      if (!quesAuthor) {
        // throw new UserInputError(
        //   `User with ID: ${question.author} does not exist!`
        // )
        return Promise.reject(new GraphQLError(`User with ID: ${question.authorId} does not exist!`));
      }

      const questionVote = await c.prisma.questionVotes.findFirst({
        where: {
          userId: user.id,
          quesId: question.id,
        },
      });
      if (questionVote) {
        // Already voted, change vote type
        if (questionVote.vote === voteType) {
          await c.prisma.questionVotes.delete({
            where: {
              id: questionVote.id,
            },
          });
          if (voteType === VoteType.Downvote) {
            // remove existing downvote
            quesAuthor.rep += 2; // +2 to remove downvote affect
            question.points += 1;
          } else {
            // remove existing upvote
            quesAuthor.rep -= 10; // -10 to remove upvote affect
            question.points -= 1;
          }
        } else {
          await c.prisma.questionVotes.update({
            where: {
              id: questionVote.id,
            },
            data: {
              vote: voteType,
            },
          });
          if (voteType === VoteType.Upvote) {
            // change downvote to upvote
            quesAuthor.rep += 12; // +2 to remove downvote affect
            question.points += 2; // extra +1 to add upvote affect
          } else {
            // change upvote to downvote
            quesAuthor.rep -= 12; // -10 to remove upvote affect
            question.points -= 2; // extra -1 to add downvote affect
          }
        }
      } else {
        // New vote
        await c.prisma.questionVotes.create({
          data: {
            userId: user.id,
            quesId: question.id,
            vote: voteType,
          },
        });
        if (voteType === VoteType.Upvote) {
          quesAuthor.rep += 10;
          question.points += 1;
        } else {
          quesAuthor.rep -= 2;
          question.points -= 1;
        }
      }

      await c.prisma.user.update({
        where: {
          id: quesAuthor.id,
        },
        data: {
          rep: quesAuthor.rep,
        },
      });
      const updatedQues = await c.prisma.question.update({
        where: {
          id: question.id,
        },
        data: {
          points: question.points,
        },
        include: {
          comments: true, 
          author: {
            select: {
              id: true,
              username: true,
            },
          },
          answers: {
            include: {
              comments: true, 
              author: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
          },
        },
      });

      // const populatedQues = await question.populate(popQuestion); // Todo: donot populate, just send the question data

      return updatedQues as any; // TODO: Fix this type;
    } catch (err) {
        return Promise.reject(err);
    }
  },

  postAnswer: async (parent, { quesId, body }, c: Context) => {
    const loggedUser = authChecker(c);

    if (body.trim() === "" || body.length < 30) {
      // throw new UserInputError('Answer must be atleast 30 characters long.')
      return Promise.reject(new GraphQLError("Answer must be atleast 30 characters long."));
    }

    const user = await c.prisma.user.findFirst({
      where: {
        id: loggedUser.id,
      },
    });
    if (!user) {
      // throw new UserInputError(
      //   `User with ID: ${loggedUser.id} does not exist in DB.`
      // )
      return Promise.reject(new GraphQLError(`User with ID: ${loggedUser.id} does not exist in DB.`));
    }
    const question = await c.prisma.question.findFirst({
      where: {
        id: quesId,
      },
    });
    if (!question) {
      // throw new UserInputError(
      //   `Question with ID: ${quesId} does not exist in DB.`
      // )
      return Promise.reject(new GraphQLError(`Question with ID: ${quesId} does not exist in DB.`));
    }
    await c.prisma.answer.create({
      data: {
        body,
        authorId: user.id,
        questionId: question.id,
      },
    });

    // const populatedQues = await question.populate({
    //   path: "answers",
    //   model: AnswerModel,
    //   populate: [
    //     {
    //       path: "author",
    //       model: UserModel,
    //     },
    //     {
    //       path: "comments",
    //       model: CommentModel,
    //     },
    //   ],
    // });
    return c.prisma.answer.findMany({ // TODO: Add pagination
      where: {
        questionId: quesId,
      },
      include: {
        author: {
          select: {
            username: true,
            id: true
          }
        },
        comments: {
          include: {
            author: {
              select: {
                username: true,
                id: true
              }
            }
          }
        }, 
      },
    });
  },

  deleteAnswer: async (parent, { ansId, quesId }, c: Context) => {
    const loggedUser = authChecker(c);

    try {
      const user = await c.prisma.user.findFirst({
        where: {
          id: loggedUser.id,
        },
      });
      if (!user) {
        // throw new UserInputError(
        //   `User with ID: ${loggedUser.id} does not exist in DB.`
        // )
        return Promise.reject(new GraphQLError(`User with ID: ${loggedUser.id} does not exist in DB.`));
      }
      const question = await c.prisma.question.findFirst({
        where: {
          id: quesId,
        },
      });
      if (!question) {
        // throw new UserInputError(
        //   `Question with ID: ${quesId} does not exist in DB.`
        // )
        return Promise.reject(new GraphQLError(`Question with ID: ${quesId} does not exist in DB.`));
      }

      const targetAnswer = await c.prisma.answer.findFirst({
        where: {
          id: ansId,
        },
      });
      if (!targetAnswer) {
        return Promise.reject(new GraphQLError(`Answer with ID: '${ansId}' does not exist in DB.`));
      }

      if (targetAnswer.authorId.toString() !== user.id.toString()) {
        // throw new ForbiddenError("You can not delete other's answer.")
        return Promise.reject(new GraphQLError("You can not delete other's answer."));
      }

      await c.prisma.answer.delete({
        where: {
          id: ansId,
        },
      });

      return ansId;
    } catch (err) {
        return Promise.reject(err);
    }
  },
  editAnswer: async (parent, { ansId, body, quesId }, c: Context) => {
    const loggedUser = authChecker(c);

    if (body.trim() === "" || body.length < 30) {
      // throw new UserInputError('Answer must be atleast 30 characters long.')
      return Promise.reject(new GraphQLError("Answer must be atleast 30 characters long."));
    }

    try {
      const question = await c.prisma.question.findFirst({
        where: {
          id: quesId,
        },
      });
      if (!question) {
        // throw new UserInputError(
        //   `Question with ID: ${quesId} does not exist in DB.`
        // )
        return Promise.reject(new GraphQLError(`Question with ID: ${quesId} does not exist in DB.`));
      }

      const answer = await c.prisma.answer.findFirst({
        where: {
          id: ansId,
        },
      });
      if (!answer) {
        // throw new UserInputError(
        //   `Answer with ID: ${ansId} does not exist in DB.`
        // )
        return Promise.reject(new GraphQLError(`Answer with ID: ${ansId} does not exist in DB.`));
      }

      if (answer.authorId.toString() !== loggedUser.id.toString()) {
        // throw new ForbiddenError("You can not edit other's answer.")
        return Promise.reject(new GraphQLError("You can not edit other's answer."));
      }
      await c.prisma.answer.update({
        where: {
          id: ansId,
        },
        data: {
          body,
          updatedAt: new Date(),
        },
      });
      return c.prisma.answer.findMany({ // TODO: add pagination
        where: {
          questionId: quesId,
        },
        include: {
          author: {
            select: {
              id: true,
              username: true,
            },
          },
          comments: {
            include: {
              author: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
          },
         },
      })
    } catch (err) {
        return Promise.reject(err);
    }
  },
  voteAnswer: async (parent, { ansId, voteType, quesId }, c: Context) => {
    const loggedUser = authChecker(c);

    // TODO : use transactions
    try {
      const user = await c.prisma.user.findFirst({
        where: {
          id: loggedUser.id,
        },
      });
      if (!user) {
        return Promise.reject(new GraphQLError(`User with ID: ${loggedUser.id} does not exist in DB.`));
      }
      const question = await c.prisma.question.findFirst({
        where: {
          id: quesId,
        },
      });
      if (!question) {
        return Promise.reject(new GraphQLError(`Question with ID: ${quesId} does not exist in DB.`));
      }
      const answer = await c.prisma.answer.findFirst({
        where: { id: ansId },
      });
      if (!answer) {
        return Promise.reject(new GraphQLError(`Answer with ID: ${ansId} does not exist in DB.`));
      }

      if (answer.authorId.toString() === user.id.toString()) {
        return Promise.reject(new GraphQLError("You can't vote for your own post."));
      }

      const ansAuthor = await c.prisma.user.findFirst({
        where: {
          id: answer.authorId,
        },
      });
      if (!ansAuthor) {
        return Promise.reject(new GraphQLError(`User with ID: ${answer.authorId} does not exist in DB.`));
      }
      const answerVote = await c.prisma.answerVotes.findFirst({
        where: {
          userId: user.id,
          ansId: answer.id,
        },
      });
      if (answerVote) {
        // Already voted, update now
        if (answerVote.vote === voteType) {
          await c.prisma.answerVotes.delete({
            where: {
              id: answerVote.id,
            },
          });
          if (voteType === VoteType.Downvote) {
            // remove existing downvote
            ansAuthor.rep += 2; // +2 to remove downvote affect
            answer.points += 1;
          } else {
            // remove existing upvote
            ansAuthor.rep -= 10; // -10 to remove upvote affect
            answer.points -= 1;
          }
        } else {
          await c.prisma.answerVotes.update({
            where: {
              id: answerVote.id,
            },
            data: {
              vote: voteType,
            },
          });
          if (voteType === VoteType.Upvote) {
            // change downvote to upvote
            ansAuthor.rep += 12; // +2 to remove downvote affect
            answer.points += 2; // extra +1 to add upvote affect
          } else {
            // change upvote to downvote
            ansAuthor.rep -= 12; // -10 to remove upvote affect
            answer.points -= 2; // extra -1 to add downvote affect
          }
        }
      } else {
        // New vote
        await c.prisma.answerVotes.create({
          data: {
            userId: user.id,
            ansId: answer.id,
            vote: voteType,
          },
        });
        if (voteType === VoteType.Upvote) {
          ansAuthor.rep += 10;
          answer.points += 1;
        } else {
          ansAuthor.rep -= 2;
          answer.points -= 1;
        }
      }
      await c.prisma.user.update({
        where: {
          id: ansAuthor.id,
        },
        data: {
          rep: ansAuthor.rep,
        },
      });
      return c.prisma.answer.update({
        where: {
          id: answer.id,
        },
        data: {
          points: answer.points,
        },
        include: {
          comments: true,
          author: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      }) as any; //TODO: Fix this type
    } catch (err) {
        return Promise.reject(err);
    }
  },
  acceptAnswer: async (parent, { ansId, quesId }, c: Context) => {
    const loggedUser = authChecker(c);

    try {
      const question = await c.prisma.question.findFirst({
        where: {
          id: quesId,
        },
      });
      if (!question) {
        return Promise.reject(new GraphQLError(`Question with ID: ${quesId} does not exist in DB.`));
      }

      if (question.authorId.toString() !== loggedUser.id.toString()) {
        return Promise.reject(new GraphQLError("Only the author of question can accept answers."));
      }

      const answer = await c.prisma.answer.findFirst({
        where: {
          id: ansId,
        },
      });
      if (!answer) {
        return Promise.reject(new GraphQLError(`Answer with ID: ${ansId} does not exist in DB.`));
      }

      if (
        !question.acceptedAnswer ||
        !(question.acceptedAnswer.toString() === answer.id.toString())
      ) {
        question.acceptedAnswer = answer.id;
        // TODO: Add reputation to answer author
      } else {
        question.acceptedAnswer = null;
      }
      return c.prisma.question.update({
        where: {
          id: quesId,
        },
        data: {
          acceptedAnswer: question.acceptedAnswer,
        },
      }) as any; // Todo: Fix this type
    } catch (err) {
        return Promise.reject(err);
    }
  },

  addComment: async (parent, { body, parentType, parentId }, c: Context) => {
    const loggedUser = authChecker(c);

    if (body.trim() === "" || body.length < 5) {
      return Promise.reject(new GraphQLError("Comment must be atleast 5 characters long."));
    }

    switch (parentType) {
      case CommentParentType.Question: {
        const question = await c.prisma.question.findFirst({
          where: {
            id: parentId,
          },
        });
        if (!question) {
          return Promise.reject(new GraphQLError(`Question with ID: ${parentId} does not exist!`));
        }

        return c.prisma.comment.create({
          data: {
            body,
            authorId: loggedUser.id,
            parentId: question.id,
          },
          include: {
            author: {
              select: {
                username: true,
                id: true,
              }
            }
          }
        }) as any; // TODO: Fix this type
      }
      break;
      case CommentParentType.Answer: {
        const answer = await c.prisma.answer.findFirst({
          where: {
            id: parentId,
          },
        });
        if (!answer) {
          return Promise.reject(new GraphQLError(`Answer with ID: ${parentId} does not exist in DB.`));
        }
        return c.prisma.comment.create({
          data: {
            body,
            authorId: loggedUser.id,
            parentId: answer.id,
          },
          include: {
            author: {
              select: {
                username: true,
                id: true,
              }
            }
          }
        });
      }
      break;
      default:
        return Promise.reject("Invalid CommentParentType!")
    }
  },
  editComment: async (parent, { body, commentId }, c: Context) => {
    const loggedUser = authChecker(c);

    if (body.trim() === "" || body.length < 5) {
      return Promise.reject(new GraphQLError("Comment must be atleast 5 characters long."));
    }

    const comment = await c.prisma.comment.findFirst({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      return Promise.reject(new GraphQLError(`Comment with ID: '${commentId}' does not exist!`));
    }

    if (comment.authorId.toString() !== loggedUser.id.toString()) {
      return Promise.reject(new GraphQLError("Access is denied."));
    }

    return c.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        body,
        updatedAt: new Date(),
      },
      include: {
        author: {
          select: {
            username: true,
            id: true,
          }
        }
      }
    }) as any; // TODO: Fix this type
  },
  deleteComment: async (parent, { commentId }, c: Context) => {
    const loggedUser = authChecker(c);

    const user = await c.prisma.user.findFirst({
      where: {
        id: loggedUser.id,
      },
    });

    if (!user || user.id.toString() !== loggedUser.id.toString()) {
      return Promise.reject(new GraphQLError(`user with ID: ${loggedUser.id} does not exist!`));
    }

    const comment = await c.prisma.comment.findFirst({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      return Promise.reject(new GraphQLError(`Comment with ID: '${commentId}' does not exist!`));
    }
    if (comment.authorId.toString() !== user.id.toString()) {
      return Promise.reject(new GraphQLError("Access is denied."));
    }
    await c.prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return commentId;
  },
};
export default mutationResolvers;
