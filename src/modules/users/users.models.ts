import mongoose from "mongoose";
import joi from "joi";
import { IUser } from "@/types";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    phone: {
      type: "string",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", UserSchema);

const validateUser = (user: IUser) => {
  const schema = joi.object({
    name: joi.string().min(4).max(10).required(),
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .min(5)
      .max(50)
      .required(),
  });
  return schema.validate(user, { abortEarly: false });
};
export { UserModel, validateUser };
