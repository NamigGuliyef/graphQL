import Joi from 'joi'
import userModel from './schema.js'

const resolvers = {
    Query: {
        async users(_, { amount }) {
            const amountSchema = Joi.number()
            const { error, value } = amountSchema.validate(amount)
            if (error) {
                return error.message
            }
            const userAmount = await userModel.find().limit(value)
            return userAmount
        },
        async user(_, { _id }) {
            const user = await userModel.findOne({ _id })
            return user
        }
    },
    Mutation: {
        async updateUser(_, { _id, user }) {
            const updateUser = await userModel.findOneAndUpdate({ _id }, { $set: user }, { new: true })
            return updateUser
        },
        async deletedUser(_, { _id }) {
            await userModel.findOneAndDelete({ _id })
            return true
        }
    }
}


export default resolvers
