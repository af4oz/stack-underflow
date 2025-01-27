import prisma from "./prisma";
import { Resolvers } from "./resolvers-types";

const resolvers: Resolvers = {
  Query: {
    viewer(_parent, _args) {
      return prisma.user.findFirst();
    },
    list(_parent, _args) {
      return prisma.user.findMany();
    },
  },
  Mutation: {
    async updateName(_parent, _args) {
      await prisma.user.updateMany({
        where: {
          name: _args.name,
        },
        data: {
          name: _args.to,
        },
      });
      return prisma.user.findFirst();
    },
  },
};

export default resolvers;
