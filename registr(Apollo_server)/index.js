import express from 'express'
import { connect } from 'mongoose'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './typeDefs.js'
import resolvers from './resolvers.js'
import userModel from './schema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import AuthMiddleWare from './auth.js'

connect("mongodb+srv://node01:node01@cluster0.aeevlra.mongodb.net/?retryWrites=true&w=majority")
const app = express()
app.use(express.json())

export const jwt_secret = 'registr_Apollo'


app.post('/signup', async (req, res) => {
    const { name, surname, email, password } = req.body
    const hashPass = await bcrypt.hash(password, await bcrypt.genSalt())
    const newUser = await userModel.create({ name, surname, email, password: hashPass })
    return res.send(newUser)
})

app.post('/signin', async (req, res) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
        return res.send('Bazada bele email yoxdur!')
    }
    const passRight = await bcrypt.compare(password, user.password)
    if (!passRight) {
        return res.send('Sifre yanlisdir!')
    }
    const token = jwt.sign({ email }, jwt_secret, { expiresIn: "1h" })
    return res.send(token)
})

app.use(AuthMiddleWare)
const server = new ApolloServer({
    typeDefs,
    resolvers

})
await server.start()
server.applyMiddleware({ app })


app.listen(5097, () => {
    console.log('server is up ....')
})

