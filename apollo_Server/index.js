import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { connect } from 'mongoose'
import typeDefs from './typeDefs.js'
import resolvers from './resolvers.js'
connect("mongodb+srv://node01:node01@cluster0.aeevlra.mongodb.net/?retryWrites=true&w=majority")
const app = express()

const server = new ApolloServer({
    typeDefs,
    resolvers
})

await server.start()
server.applyMiddleware({ app })

app.listen(5096, () => console.log('server is up ...'))
