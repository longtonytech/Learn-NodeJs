import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
    },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    password: {
      type: "string",
      required: true,
    },
    role: {
      type: "string",
      required: true,
    },
    phone: {
      type: "string",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", UserSchema);

export { UserModel };
