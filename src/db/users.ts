import mongoose from "mongoose";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  Branch: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: true },
  },
});

export const UserModel = mongoose.model("User", UserSchema);

export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

export const getUserById = (id: string) => UserModel.findById(id);

export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);

export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });

export const getUserByEmail = (email: string) => UserModel.findOne({ email });
