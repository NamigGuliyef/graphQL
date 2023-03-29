import { gql } from "apollo-server-express";

const typeDefs = gql(`

type Book {
    _id: ID!
    name: String!
    pageCount: Int!
    authorId: ID!
}

type Author {
    _id: ID!
    name: String!
    surname: String!
    age: Int!
}

type Query {
    books: [Book]!
    book(_id:ID!): Book!
    booksAmount(amount:Int!): [Book]! 
    authors: [Author]!
    author(_id:ID!): Author!
    authorAmount(amount:Int!): [Author]! 
}

input createBookInput {
    name: String!
    pageCount: Int!
    authorId: ID!
}

input updateBookInput {
    name: String!
    pageCount: Int!
}


input createAuthorInput {
    name: String!
    surname: String!
    age: Int!
}

input updateAuthorInput {
    name: String!
    surname: String!
    age: Int!
}

type Mutation {
    createBook(book: createBookInput): Book!
    updateBook(_id: ID!,book: updateBookInput): Book!
    deleteBook(_id: ID!): Book!
    createAuthor(author: createAuthorInput): Author!
    updateAuthor(_id: ID!, author: updateAuthorInput): Author!
    deleteAuthor(_id: ID!): Author!
}`)


export default typeDefs