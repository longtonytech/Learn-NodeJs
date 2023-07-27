import { IWallet } from "@/types";
import { formatEditWallet } from "./wallets.utils";
import { WalletModel } from "./wallets.models";

const getWallets = async () => {
  let wallets: IWallet[] = [];
  try {
    wallets = await WalletModel.find({});
    return wallets;
  } catch (error) {
    console.log(error);
  }
};
const getWalletById = async (id: string) => {
  try {
    const wallet = await WalletModel.findById(id);
    return wallet;
  } catch (error) {
    console.log(error);
  }
};
const getWalletByAddress = async (walletAddress?: string) => {
  try {
    const [wallet] = await WalletModel.find({ walletAddress: walletAddress });
    return wallet;
  } catch (error) {
    console.log(error);
  }
};
const getWallestByUserId = async (userId?: string) => {
  try {
    const wallets = await WalletModel.find({ userId: userId });
    return wallets;
  } catch (error) {
    console.log(error);
  }
};
const getWallestByApplicationId = async (applicationId?: string) => {
  try {
    const wallets = await WalletModel.find({ applicationId: applicationId });
    return wallets;
  } catch (error) {
    console.log(error);
  }
};

const createWallet = async (wallet: IWallet) => {
  const walletModel = new WalletModel(wallet);
  try {
    const newWallet = await walletModel.save();
    return newWallet;
  } catch (error) {
    console.log(error);
  }
};

const deleteWallet = async (id: string) => {
  try {
    const wallet = await WalletModel.findByIdAndRemove(id);
    return wallet;
  } catch (error) {
    console.log(error);
  }
};

const editWallet = async (id: string, body: any) => {
  const fields = Object.keys(WalletModel.schema.obj);
  const editWallet = formatEditWallet(fields, body);
  try {
    const wallet = await WalletModel.findByIdAndUpdate(id, editWallet, {
      new: true,
    });
    return wallet;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getWallets,
  getWalletById,
  createWallet,
  deleteWallet,
  editWallet,
  getWalletByAddress,
  getWallestByUserId,
  getWallestByApplicationId,
};
