import express from 'express'
import mongoose, { connect } from 'mongoose'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './typeDefs.js'
import resolvers from './resolvers.js'
import userModel from './schema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import AuthMiddleWare from './auth.js'
import { jwt_secret } from './utils.js'
import Joi from 'joi'

connect('mongodb+srv://node01:j4cm3DQBU2MhIEN5@cluster0.ndpakvg.mongodb.net/?retryWrites=true&w=majority')

const app = express()
app.use(express.json())



app.post('/signup', async (req, res) => {
    const signUpBodySchema = Joi.object({
        name: Joi.string().required(),
        surname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        repeat_password: Joi.ref('password')
    })

    const { error, value: { repeat_password, ...lazimliValue } } = signUpBodySchema.validate(req.body)
    if (error) {
        return res.status(400).send(error.message)
    }
    const hashPass = await bcrypt.hash(lazimliValue.password, await bcrypt.genSalt())
    const newUser = await userModel.create({ ...lazimliValue, password: hashPass })
    return res.send(newUser)
})

app.post('/signin', async (req, res) => {
    const signInBodySchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
    const { error, value: { email, password } } = signInBodySchema.validate(req.body)
    if (error) {
        return res.status(400).send(error.message)
    }

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
// app.use(AuthMiddleWare)

const server = new ApolloServer({
    typeDefs,
    resolvers
})
await server.start()
server.applyMiddleware({ app })


app.listen(5097, () => {
    console.log('server is up ....')
})

