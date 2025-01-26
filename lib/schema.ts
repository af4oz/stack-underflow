const typeDefs = /* GraphQL */ `
  type User {
    id: Int!
    name: String!
    status: String!
  }

  type Query {
    viewer: User!
    list: [User!]!
  }

  type Mutation {
    updateName(name: String!, to: String!): User!
  }
`;

export default typeDefs;
