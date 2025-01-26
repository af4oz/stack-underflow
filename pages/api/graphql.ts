import { createSchema, createYoga } from "graphql-yoga";
import gql from "graphql-tag";

import resolvers from "lib/resolvers";
import typeDefs from "lib/schema";
import { NextApiRequest, NextApiResponse } from "next";
import { context } from "lib/context";

const schema = createSchema({
  typeDefs: gql(typeDefs),
  resolvers,
});

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema,
  context: context,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: "/api/graphql",
  // cors: {
  //   origin: '*',
  //   credentials: false
  // }
});
