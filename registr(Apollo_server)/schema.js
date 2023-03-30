import { model, Schema } from "mongoose";
const userSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    password: String
}, { versionKey: false })

const userModel = model('user', userSchema)
export default userModel
