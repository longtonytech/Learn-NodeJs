import joi from "joi";
import { IUser } from "@/types";

const validateCreateUser = (user: IUser) => {
  const schema = joi.object({
    name: joi.string(),
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: joi.string().required(),
    phone: joi.string().length(10),
  });
  return schema.validate(user, { abortEarly: false });
};
const validateEditUser = (user: IUser) => {
  const schema = joi.object({
    name: joi.string(),
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    phone: joi.string(),
  });
  return schema.validate(user, { abortEarly: false });
};
export { validateCreateUser, validateEditUser };
