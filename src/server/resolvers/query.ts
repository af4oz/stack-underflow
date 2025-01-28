import { QuestionSortBy, Resolvers } from "src/server/__generated__/resolvers-types";
import authChecker from "src/server/utils/authChecker";
import errorHandler from "src/server/utils/errorHandler";
import { Context } from "./context";

const queryResolvers: Resolvers["Query"] = {
  whoami: async (parent, args, c: Context) => {
    try {
      const loggedUser = authChecker(c);
      if (loggedUser.id) {
        const user = await c.prisma.user.findUnique({
          where: {
            id: loggedUser.id,
          }
        });
        if (!user) {
          throw new Error(
            `User with ID: ${loggedUser.id} does not exist in DB.`
          );
        }
        return user as any; // TODO: Fix this type;
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(errorHandler(err));
    }
  },
  getAllUsers: async (_, _1, c) => {
    return (await c.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
    })) as any; // TODO: Fix this type;
  },
  getUser: async (parent, { username }, c: Context) => {
    if (username.trim() === "") {
      throw new Error("Username must be provided.");
    }

    const user = await c.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new Error(`User '${username}' does not exist.`);
    }
    return user as any; // TODO: Fix this type;
  },
  getQuestions: async (
    parent,
    { sortBy, limit, page, filterBySearch, filterByTag },
    c: Context
  ) => {
    let sortQuery;
    switch (sortBy) {
      case QuestionSortBy.Votes:
        sortQuery = { points: "desc" };
        break;
      case QuestionSortBy.Views:
        sortQuery = { views: "desc" };
        break;
      case QuestionSortBy.Newest:
        sortQuery = { createdAt: "desc" };
        break;
      case QuestionSortBy.Oldest:
        sortQuery = { createdAt: "asc" };
        break;
      default:
        sortQuery = { createdAt: "desc" };
        // sortQuery = { hotAlgo: "desc" };
        break;
    }

    try {
      const questions = (await c.prisma.question.findMany({
        where: {
          title: {
            ...(filterBySearch ? { contains: filterBySearch } : {}),
          },
          body: {
            ...(filterBySearch ? { contains: filterBySearch } : {}),
          },
          tags: {
            hasSome: filterByTag ? [filterByTag] : [],
          },
        },
        orderBy: {
          ...sortQuery,
        },
        take: limit,
        skip: limit * (page - 1),
        include: {
          _count: {
            select: {
              answers: true,
            },
          },
          author: {
            select: {
              username: true,
            },
          },
        },
      })) as any; // TODO: Fix this type;
      const paginatedQues = {
        totalCount: questions.length,
        currentPage: page,
        pageSize: limit,
        questions,
        tag: filterByTag,
        search: filterBySearch,
        sortBy,
      };

      return paginatedQues;
    } catch (error) {
      throw new Error(errorHandler(error));
    }
  },
  viewQuestion: async (parent, { quesId }, c: Context) => {
    try {
      const question = await c.prisma.question.findFirst({
        where: {
          id: quesId,
        },
      });
      if (!question) {
        throw new Error(`Question with ID: ${quesId} does not exist!`);
      }

      const savedQues = await c.prisma.question.update({
        where: {
          id: quesId,
        },
        data: {
          views: question.views + 1,
        },
        include: {
          // comments: {}, // TODO: Add this relation
          author: {
            select: {
              username: true,
            },
          },
          answers: {
            include: {
              // comments: {}, // TODO: Add this relation
              author: {
                select: {
                  username: true,
                },
              },
            },
          },
        },
      });

      // const populatedQues = await savedQues.populate(popQuestion)

      return savedQues as any; // TODO: Fix this type;
    } catch (err) {
      throw new Error(errorHandler(err));
    }
  },
  getAllTags: async (parent, { limit, cursor, filterBySearch }, c: Context) => {
    const _limit = Number(limit) || 10;

    const tags = await c.prisma.tag.findMany({
      where: {
        name: {
          ...(filterBySearch ? { contains: filterBySearch } : {}),
        },
      },
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        id: "desc",
      },
      take: _limit,
    });

    return {
      tags,
      nextCursor:
        tags.length && tags.length === limit ? tags[tags.length - 1].id : "",
    };
  },
};

export default queryResolvers;
