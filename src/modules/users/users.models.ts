import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: {
    type: "string",
  },
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  phone: {
    type: "string",
  },
  createdAt: {
    type: "string",
  },
  updatedAt: {
    type: "string",
  },
});
export const UserModel = mongoose.model("users", UserSchema);
