import { gql } from "apollo-server-express";

const typeDefs = gql(`

type User {
    _id: ID!
    name: String!
    surname: String!
    email: String!
}

type Query {
    user(_id: ID!): User!
    users(amount: Int): [User]
}

input updateUserInput {
    email: String!
    password: String!
}

input createUserInput{
    name: String!
    surname: String!
    email: String!
    password: String!
}

type Mutation {
    createUser(user: createUserInput): User!
    updateUser(_id: ID!, user: updateUserInput): User!
    deletedUser(_id: ID!): Boolean
}


`)

export default typeDefs
