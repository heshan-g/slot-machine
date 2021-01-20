const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: String!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  # Queries (SELECTS)
  type Query {
    getUsers: [User]
  }

  # Mutations (INSERT, UPDATE & DELETE)
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
  }
`;

module.exports = typeDefs;
