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

type Query {
    users: [User]!
    user(_id: String!): User
}

type Mutation {
    addUser(name: String!, surname: String!, age: Int!, email: String!, password: String!): User
    updateUser(_id: String!, name: String!, surname: String!, age: Int!, email: String!): User
    deleteUser(_id: String!): User
}`)

export default schema