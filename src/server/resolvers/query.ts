import {
  QuestionSortBy,
  Resolvers,
} from 'src/server/__generated__/resolvers-types'
import authChecker from 'src/server/utils/authChecker'
import { Context } from './context'
import { GraphQLError } from 'graphql'

const queryResolvers: Resolvers['Query'] = {
  whoami: async (parent, args, c: Context) => {
    try {
      const loggedUser = authChecker(c)
      if (loggedUser.id) {
        const user = await c.prisma.user.findUnique({
          where: {
            id: loggedUser.id,
          },
        })
        if (!user) {
          return Promise.reject(new GraphQLError(`User with ID: ${loggedUser.id} does not exist in DB.`));
        }
        return user as any // TODO: Fix this type;
      } else {
        return null
      }
    } catch (err) {
        return Promise.reject(err);
    }
  },
  getAllUsers: async (_, _1, c) => {
    return (await c.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
    })) as any // TODO: Fix this type;
  },
  getUser: async (parent, { username }, c: Context) => {
    if (username.trim() === '') {
      return Promise.reject(new GraphQLError('Username must be provided.'));
    }

    const user = await c.prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) {
      return Promise.reject(new GraphQLError(`User '${username}' does not exist.`));
    }
    return user as any // TODO: Fix this type;
  },
  getQuestions: async (
    parent,
    { sortBy, limit, page = 1, filterBySearch, filterByTag },
    c: Context
  ) => {
    let sortQuery
    switch (sortBy) {
      case QuestionSortBy.Votes:
        sortQuery = { points: 'desc' }
        break
      case QuestionSortBy.Views:
        sortQuery = { views: 'desc' }
        break
      case QuestionSortBy.Newest:
        sortQuery = { createdAt: 'desc' }
        break
      case QuestionSortBy.Oldest:
        sortQuery = { createdAt: 'asc' }
        break
      default:
        sortQuery = { createdAt: 'desc' }
        // sortQuery = { hotAlgo: "desc" };
        break
    }

    try {
      const questions = (await c.prisma.question.findMany({
        where: {
          AND: [
            filterBySearch
              ? {
                  OR: [
                    {
                      title: { contains: filterBySearch, mode: 'insensitive' },
                    },
                    { body: { contains: filterBySearch, mode: 'insensitive' } },
                  ],
                }
              : {},
            filterByTag
              ? {
                  tags: {
                    has: filterByTag,
                  },
                }
              : {},
          ],
        },
        orderBy: {
          ...sortQuery,
        },
        take: limit,
        skip: limit * Math.max(page - 1, 0),
        include: {
          // _count: {
          //   select: {
          //     answers: true,
          //   },
          // },
          author: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      }))
      // console.log({filterBySearch,filterByTag})

      const paginatedQues = {
        totalCount: questions.length,
        currentPage: page,
        pageSize: limit,
        questions,
        tag: filterByTag,
        search: filterBySearch,
        sortBy,
      }

      return paginatedQues as any // fix this type in schema.ts
    } catch (err) {
        return Promise.reject(err);
    }
  },
  viewQuestion: async (parent, { quesId }, c: Context) => {
    try {
      const question = await c.prisma.question.findFirst({
        where: {
          id: quesId,
        },
      })
      if (!question) {
        return Promise.reject(new GraphQLError(`Question with ID: ${quesId} does not exist!`));
      }

      const savedQues = await c.prisma.question.update({
        where: {
          id: quesId,
        },
        data: {
          views: question.views + 1,
        },
        include: {
          comments: {
            include: {
              author: {
                select: {
                  id: true,
                  username: true,
                }
              }
            }
          },
          author: {
            select: {
              id: true,
              username: true,
            },
          },
          answers: {
            include: {
              comments: {
                include: {
                  author: {
                    select: {
                      id: true,
                      username: true,
                    }
                  }
                }
              },
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

      // const populatedQues = await savedQues.populate(popQuestion)

      return savedQues as any // TODO: Fix this type;
    } catch (err) {
        return Promise.reject(err);
    }
  },
  getAllTags: async (parent, { limit, cursor, filterBySearch }, c: Context) => {
    const _limit = Number(limit) || 10

    const tags = await c.prisma.tag.findMany({
      where: {
        name: {
          ...(filterBySearch ? { contains: filterBySearch } : {}),
        },
      },
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        id: 'desc',
      },
      take: _limit,
    })

    return {
      tags,
      nextCursor:
        tags.length && tags.length === limit ? tags[tags.length - 1].id : '',
    }
  },
}

export default queryResolvers
