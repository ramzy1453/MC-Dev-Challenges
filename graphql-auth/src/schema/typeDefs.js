import { buildSchema } from "graphql";

export const typeDefs = buildSchema(`
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    role: String!
    createdAt: String!
    updatedAt: String!
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    profile: User
  }

  input RegisterInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  }

  type Mutation {
    register(input : RegisterInput!): Auth!
    login(email: String!, password: String!): Auth!
  }
`);
