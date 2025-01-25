import { Context } from "./context";
import { Resolvers } from "./resolvers-types";

const userProfile = {
  id: String(1),
  name: "John Smith",
  status: "cached",
};

const resolvers: Resolvers = {
  Query: {
    viewer(_parent, _args, _context: Context, _info) {
      return _context.prisma.user.findFirst();
    },
  },
  Mutation: {
    updateName(_parent, _args, _context, _info) {
      userProfile.name = _args.name;
      return userProfile;
    },
  },
};

export default resolvers;
