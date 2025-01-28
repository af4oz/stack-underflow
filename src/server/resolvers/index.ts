import getUser from "src/server/utils/getUser";
import { Context } from "./context";
import prisma from "../prisma";
import { Resolvers, VoteType } from "../__generated__/resolvers-types";
import mutationResolvers from "./mutation";
import queryResolvers from "./query";

const resolvers: Resolvers = {
  Query: { ...queryResolvers },
  Mutation: {
    ...mutationResolvers,
  },
  Answer: {
    voted: async (p, a, c: Context) => {
      const loggedUser = getUser(c);
      if (!loggedUser) {
        return null;
      }
      const voted = await c.prisma.answerVotes.findFirst({
        where: {
          userId: loggedUser.id,
          ansId: p.id,
        },
      });
      if (voted) {
        return voted.vote as VoteType; // TODO
      } else {
        return null;
      }
    },
  },
  User: {
    recentQuestions: async (p, a, c: Context) => {
      return await c.prisma.question.findMany({
        where: {
          authorId: p.id,
        },
        select: {
          id: true,
          title: true,
          points: true,
          createdAt: true,
        },
      });
    },
    recentAnswers: async (parent) => {
      return prisma.answer.findMany({
        where: {
          authorId: parent.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      });
    },
    totalQuestions: async (p, a, c: Context) => {
      return await c.prisma.question.count({
        where: {
          authorId: p.id,
        },
      });
    },
    totalAnswers: async (p, a, c: Context) => {
      return await c.prisma.answer.count({
        where: {
          authorId: p.id,
        },
      });
    },
  },
  Question: {
    voted: async (p, a, c: Context) => {
      const loggedUser = getUser(c);
      if (!loggedUser) {
        return null;
      }
      const voted = await c.prisma.questionVotes.findFirst({
        where: {
          userId: loggedUser.id,
          quesId: p.id,
        },
      });
      if (voted) {
        return voted.vote as VoteType; // TODO;
      } else {
        return null;
      }
    },
    hotAlgo: async (parent, a, c: Context) => {
      const upvoteCount = await c.prisma.questionVotes.count({
        where: {
          id: parent.id,
          vote: VoteType.Upvote,
        },
      });
      const downvoteCount = await c.prisma.questionVotes.count({
        where: {
          id: parent.id,
          vote: VoteType.Downvote,
        },
      });
      const result =         Math.log(
          Math.max(Math.abs(upvoteCount - downvoteCount), 1)
        ) +
        Math.log(Math.max(parent.views * 2, 1)) +
        parent.createdAt.getTime() / 4500
      return result;
    },
    answerCount: async (parent) => {
      return prisma.answer.count({
        where: {
          questionId: parent.id,
        },
      });
    },
    upvoteCount: async (parent, a,c:Context) => {
      const result = await c.prisma.questionVotes.count({
        where: {
          id: parent.id,
          vote: VoteType.Upvote,
        },
      });
      return result
    },
    downvoteCount: async (parent) => {
      return prisma.questionVotes.count({
        where: {
          id: parent.id,
          vote: VoteType.Downvote,
        },
      });
    },
  },
};

export default resolvers;
