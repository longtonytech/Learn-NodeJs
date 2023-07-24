import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);
export const UserModel = mongoose.model("Users", UserSchema);
