import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import mongoose, { connect } from 'mongoose'
import schema from './type.js'
import rootValue from './router.js'
import userMiddleWare from './auth.js'
connect("mongodb+srv://node01:node01@cluster0.aeevlra.mongodb.net/?retryWrites=true&w=majority")
const app = express()
const port = 5095


app.use('/graphql', graphqlHTTP({ schema, rootValue, graphiql: true }))

app.listen(5095, () => console.log(`port ${port} server is up ...`))
