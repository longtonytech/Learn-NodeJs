import { IWallet } from "@/types";
import { v4 as uuidv4 } from "uuid";

export const formatWallet = (newWallet: IWallet, wallet: IWallet) => ({
  id: wallet.id,
  userId: wallet.userId,
  name: newWallet.walletAddress || wallet.walletAddress,
  email: newWallet.amountOfMoney || wallet.amountOfMoney,
  phone: newWallet.privateKey || wallet.privateKey,
  updatedAt: new Date().toISOString(),
});

export const createdWallet = (body: any, id?: string): IWallet => ({
  id: id || uuidv4().slice(0, 8),
  userId: body.userId,
  walletAddress: body.walletAddress,
  amountOfMoney: body.amountOfMoney,
  privateKey: body.privateKey,
});

export const checkEmty = (requiredFields: string[], wallet: IWallet) => {
  let errors: any = {};
  requiredFields.map((field: string) => {
    if (!wallet[field as keyof IWallet]) {
      return (errors[field] = `${field} cannot empty`);
    }
  });
  return errors;
};
