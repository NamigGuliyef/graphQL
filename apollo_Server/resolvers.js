import { bookModel, authorModel } from "./schema.js"
const resolvers = {
    Query: {
        async books() {
            const books = await bookModel.find()
            return books
        },
        async book(_, { _id }) {
            const book = await bookModel.findOne({ _id })
            return book
        },
        async booksAmount(_, { amount }) {
            const books = await bookModel.find().limit(amount)
            return books
        },
        async authors() {
            const authors = await authorModel.find()
            return authors
        },
        async author(_, { _id }) {
            const author = await authorModel.findOne({ _id })
            return author
        },
        async authorAmount(_, { amount }) {
            const authors = await authorModel.find().limit(amount)
            return authors
        }
    },

    Mutation: {
        async createBook(_, { book }) {
            const newBook = await bookModel.create(book)
            return newBook
        },
        async updateBook(_, { _id, book }) {
            const updateBook = await bookModel.findOneAndUpdate({ _id }, { $set: book }, { new: true })
            return updateBook
        },
        async deleteBook(_, { _id }) {
            const deletedBook = await bookModel.findOneAndDelete({ _id })
            return deletedBook
        },
        async createAuthor(_, { author }) {
            const newAuthor = await authorModel.create(author)
            return newAuthor
        },
        async updateAuthor(_, { _id, author }) {
            const updateAuthor = await authorModel.findOneAndUpdate({ _id }, { $set: author }, { new: true })
            return updateAuthor
        },
        async deleteAuthor(_, { _id }) {
            const deletedAuthor = await authorModel.findOneAndDelete({ _id })
            return deletedAuthor
        }
    }
}

export default resolvers
