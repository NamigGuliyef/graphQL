import userModel from "./user.schema";
import { hash, genSalt, compare } from "bcrypt";

type createInput = {
  name: string;
  email: string;
  password: string;
};

type updateInput = {
  name: string;
  email: string;
  password: string;
};

const rootValue = {
  users: async () => {
    const allUser = await userModel.find();
    return allUser;
  },
  user: async ({ _id }: { _id: string }) => {
    const user = await userModel.findById(_id);
    return user;
  },
  userAmount: async ({ amount }: { amount: number }) => {
    const users = await userModel.find().limit(amount);
    return users;
  },
  createUser: async ({ user }: { user: createInput }) => {
    const hashPass = await hash(user.password, await genSalt());
    const newUser = await userModel.create({ ...user, password: hashPass });
    return newUser;
  },
  updateUser: async ({ _id, user }: { _id: string; user: updateInput }) => {
    const userExist = await userModel.findById(_id);
    if (!userExist) {
      return "user not found!";
    }
    const hashPass = await hash(user.password, await genSalt());
    const updateUser = await userModel.findByIdAndUpdate(
      _id,
      { $set: { ...user, password: hashPass } },
      { new: true }
    );
    return updateUser;
  },
  deleteUser: async ({ _id }: { _id: string }) => {
    await userModel.findByIdAndDelete(_id);
    return true;
  },
};
export default rootValue;
