import { IncomingMessage, ServerResponse } from "http";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  from,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context'
import resolvers from "../server/resolvers";
import typeDefs from "../server/schema";
import storage from '~~/utils/localStorage';
import type { PrismaClient } from "@prisma/client";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export type ResolverContext = {
  req?: IncomingMessage;
  res?: ServerResponse;
  prisma?: PrismaClient
};

const authLink = setContext(() => {
  const loggedUser = storage.loadUser()

  return {
    headers: {
      authorization: loggedUser ? loggedUser.token : null,
    },
  }
})

function createIsomorphLink(context: ResolverContext = {}) {
  if (typeof window === "undefined") {
    const { SchemaLink } = require("@apollo/client/link/schema");
    const { makeExecutableSchema } = require("@graphql-tools/schema");

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });
    return new SchemaLink({ schema, context });
  } else {
    const { HttpLink } = require("@apollo/client");
    return from([authLink, new HttpLink({
      uri: "/api/graphql",
      credentials: "same-origin",
    })]);
  }
}
function createApolloClient(context?: ResolverContext) {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createIsomorphLink(context),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(
  initialState: any = null,
  // Pages with Next.js data fetching methods, like `getStaticProps`, can send
  // a custom context which will be used by `SchemaLink` to server render pages
  context?: ResolverContext
) {
  const _apolloClient = apolloClient ?? createApolloClient(context);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}
