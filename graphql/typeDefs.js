const { gql } = require('apollo-server');

const typeDefs = gql`
  type Voucher {
    voucherID: String
    value: Int
  }

  type User {
    id: String!
    email: String!
    password: String!
    dateOfBirth: String!
    prizePoints: Int!
    attempts: Int!
    vouchers: [Voucher]!
    isActive: Boolean!
    token: String!
    # createdTime: String!
  }
  input RegisterInput {
    email: String!
    password: String!
    confirmPassword: String!
    dateOfBirth: String!
  }

  # Queries (SELECTS)
  type Query {
    getUsers: [User]
  }

  # Mutations (INSERT, UPDATE & DELETE)
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
  }
`;

module.exports = typeDefs;
