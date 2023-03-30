import  userModel  from './schema.js'

const resolvers = {
    Query: {
        async users() {
            const users = await userModel.find()
            return users
        },
        async userAmount(_, { amount }) {
            const userAmount = await userModel.find().limit(amount)
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