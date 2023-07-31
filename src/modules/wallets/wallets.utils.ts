import { IRequestType } from "@/types";
import { Request } from "express";

export const formatEditWallet = (fields: string[], body: any) => {
  let editWallet: any = {};
  fields.map((field) => {
    if (body[field]) {
      return (editWallet[field] = body[field]);
    }
  });
  return editWallet;
};

export const formatCreateWallet = (req: Request & IRequestType) => ({
  userId: req.userId,
  walletAddress: req.body.walletAddress,
  amountOfMoney: req.body.amountOfMoney || "emptyMoney",
  privateKey: req.body.privateKey || "emptyKey",
});
