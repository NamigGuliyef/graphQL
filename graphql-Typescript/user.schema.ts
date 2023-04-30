import { Schema, model } from "mongoose";
type User = {
  name: string;
  email: string;
  password: string;
};

const userSchema = new Schema<User>(
  {
    name: String,
    email: String,
    password: String,
  },
  { versionKey: false, timestamps: true }
);

const userModel = model("user", userSchema);
export default userModel;
