import { gql } from "apollo-server-express";

const typeDefs = gql(`

type User {
    _id: ID!
    name: String!
    surname: String!
    email: String!
    password: String!
}

type Query {
    users: [User]!
    user(_id: ID!): User!
    userAmount(amount: Int!): [User]!
}

input updateUserInput {
    email: String!
    password: String!
}

type Mutation {
    updateUser(_id: ID!, user: updateUserInput): User!
    deletedUser(_id: ID!): Boolean
}`)

export default typeDefs