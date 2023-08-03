import joi from "joi";
import { IApplicationWallet } from "@/types";

const validateCreateApplicationWallet = (
  applicationWallet: IApplicationWallet
) => {
  const schema = joi.object({
    name: joi.string().required(),
    userId: joi.string().required(),
    walletId: joi.string().required(),
    applicationId: joi.string().required(),
  });
  return schema.validate(applicationWallet, { abortEarly: false });
};
const validateEditApplicationWallet = (
  applicationWallet: IApplicationWallet
) => {
  const schema = joi.object({
    name: joi.string().required(),
  });
  return schema.validate(applicationWallet, { abortEarly: false });
};
export { validateCreateApplicationWallet, validateEditApplicationWallet };
