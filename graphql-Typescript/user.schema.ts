import { buildSchema } from "graphql";

const schema = buildSchema(`
type User {
    _id: String!
    name: String!
    email: String!
    password: String!
}

type Query {
    users: [User]!
    user(_id: ID!): User!
    userAmount(amount: Int!): User!
}

type create {
    name: String!
    email: String!
    password: String!
}

type update {
    name: String
    email: String
    password: String
}

type Mutation {
    createUser(user: create): User!
    updateUser(_id: ID!,user: update): User!
    deleteUser(_id: ID!): Boolean
}
`);

export default schema;
