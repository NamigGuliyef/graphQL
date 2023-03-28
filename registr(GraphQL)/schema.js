import { model, Schema } from "mongoose";
const userSchema = new Schema({
    name: String,
    surname: String,
    age: Number,
    email: {
        type: String,
        unique: true
    },
    password: String
}, { versionKey: false })

const userModel = model('user', userSchema)
export default userModel
