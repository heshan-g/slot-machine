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
  }

  input RegisterInput {
    email: String!
    password: String!
    confirmPassword: String!
    dateOfBirth: String!
  }

  type gameState {
    prizePoints: Int!
    attempts: Int!
    vouchers: [Voucher]!
    isActive: Boolean!
  }

  # Queries (SELECTS)
  type Query {
    getUser(userId: ID!): User!
  }

  # Mutations (INSERT, UPDATE & DELETE)
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!

    play(points: Int!): gameState
    redeemPoints(voucherID: String!): gameState
    useCoupon(voucherID: String!): gameState
    deactivateAccount(status: Boolean!): gameState!
  }
`;

module.exports = typeDefs;
