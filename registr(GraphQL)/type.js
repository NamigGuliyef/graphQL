import { buildSchema } from "graphql";

const schema = buildSchema(`

type User {
    _id: String!
    name: String!
    surname: String!
    age: Int!
    email: String!
    password: String!
}

type AuthData {
    userId: String!
    token: String!
    tokenExpiration: Int!
}

type Query {
    users: [User]!
    user(_id: String!): User
    login(email: String!, password: String!): AuthData
}

type Mutation {
    addUser(name: String!, surname: String!, age: Int!, email: String!, password: String!): User
    updateUser(_id: String!, name: String!, surname: String!, age: Int!, email: String!): User
    deleteUser(_id: String!): User
}`)

export default schema