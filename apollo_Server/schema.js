import { model, Schema } from "mongoose";

const bookSchema = new Schema({
    name: String,
    pageCount: Number,
    authorId: String
}, { versionKey: false })

export const bookModel = model('book', bookSchema)

const authorSchema = new Schema({
    name: String,
    surname: String,
    age: Number
},{ versionKey: false })

export const authorModel = model('author', authorSchema)
