import userModel from "./schema.js";

export const rootValue = {
    users: async () => await userModel.find(),
    user: async ({ _id }) => await userModel.findOne({_id}),
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

