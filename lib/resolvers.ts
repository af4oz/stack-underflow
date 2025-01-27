import { Context } from "./context";
import prisma from "./prisma";
import { Resolvers } from "./resolvers-types";

const userProfile = {
  id: String(1),
  name: "John Smith",
  status: "cached",
};

const resolvers: Resolvers = {
  Query: {
    viewer(_parent, _args, _context: Context, _info) {
      return prisma.user.findFirst();
    },
    list(_parent, _args, _context: Context, _info) {
      return prisma.user.findMany();
    },
  },
  Mutation: {
    async updateName(_parent, _args, _context: Context, _info) {
      const users = await prisma.user.updateMany({
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
