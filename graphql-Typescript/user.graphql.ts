import { buildSchema } from "graphql";

const schema = buildSchema(`
type User {
    _id: ID!
    name: String!
    email: String!
    password: String
}

type Query {
    users: [User]!
    user(_id: ID!): User!
    userAmount(amount: Int!): User!
}

input createInput {
    name: String!
    email: String!
    password: String
}

input updateInput {
    name: String
    email: String
    password: String
}

type Mutation {
    createUser(user: createInput!): User
    updateUser(_id: ID!,user: updateInput): User
    deleteUser(_id: ID!): Boolean
}
`);

export default schema;
