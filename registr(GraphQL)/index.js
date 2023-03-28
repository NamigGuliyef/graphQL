import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import mongoose, { connect } from 'mongoose'
import schema from './type.js'
import { rootValue } from './router.js'
import userMiddleWare from './auth.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userModel from "./schema.js";

connect("mongodb+srv://node01:node01@cluster0.aeevlra.mongodb.net/?retryWrites=true&w=majority")
const app = express()
app.use(express.json())
const port = 5095

app.post('/signup', async (req, res) => {
    const { name, surname, age, email, password } = req.body
    const hashedPass = await bcrypt.hash(password, await bcrypt.genSalt())
    const newUser = await userModel.create({ name, surname, age, email, password: hashedPass })
    res.status(200).send(newUser)
})


app.post('/signin', async (req, res) => {
    const { email, password } = req.body
    const userExist = await userModel.findOne({ email: email })
    if (!userExist) {
        throw new Error('İstifadeci tapilmadi!')
    }
    const passRight = await bcrypt.compare(password, userExist.password)
    if (!passRight) {
        throw new Error('Şifre yanlisdir !')
    }
    const token = jwt.sign({ email }, 'graphQL', { expiresIn: '1h' })
    res.status(200).send({ userId: userExist._id, token: token, tokenExpiration: 1 })
})

app.use('/graphql', userMiddleWare, graphqlHTTP({ schema, rootValue, graphiql: true }))

app.listen(5095, () => console.log(`port ${port} server is up ...`))
