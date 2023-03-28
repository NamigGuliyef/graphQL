import userModel from "./schema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const rootValue = {
    users: async () => await userModel.find(),
    user: async ({ _id }) => await userModel.findOne({_id}),
    login: async ({ email, password }) => {
        const user = await userModel.findOne({ email: email })
        if (!user) {
            throw new Error('İstifadeci tapilmadi!')
        }
        const passRight = await bcrypt.compare(password, user.password)
        if (!passRight) {
            throw new Error('Şifre yanlisdir !')
        }
        const token = jwt.sign({ email }, 'graphQL', { expiresIn: '1h' })
        return { userId: user._id, token: token, tokenExpiration: 1 }
    },
    addUser: async ({ name, surname, age, email, password }) => {
        const newUser = { name, surname, age, email, password }
        const hashedPass = await bcrypt.hash(password, await bcrypt.genSalt())
        await userModel.create({ name, surname, age, email, password: hashedPass })
        return newUser
    },
    updateUser: async ({ _id, name, surname, age, email }) => {
        const newUser = { _id, name, surname, age, email }
        await userModel.findOneAndUpdate({ _id }, { $set: newUser }, { new: true })
        return newUser
    },
    deleteUser: async ({ _id }) => {
        const deleteUser = await userModel.findOneAndDelete({ _id })
        return deleteUser
    }
}

export default rootValue