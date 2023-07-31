import { IApplicationWallet } from "@/types";
import { ApplicationWalletModel } from "./applications-wallets.models";
import { formatEditApplicationWallet } from "./applications-wallets.utils";

const getApplicationWallets = async (userId?: string) => {
  let applicationWallets: IApplicationWallet[] = [];
  try {
    applicationWallets = await ApplicationWalletModel.find({ userId: userId });
    return applicationWallets;
  } catch (error) {
    console.log(error);
  }
};

const getApplicationWallet = async (applicationWallet: IApplicationWallet) => {
  try {
    const resApplicationWallet = await ApplicationWalletModel.findOne(
      applicationWallet
    );
    return resApplicationWallet;
  } catch (error) {
    console.log(error);
  }
};

const getApplicationWalletsByWalletId = async (
  userId?: string,
  walletId?: string
) => {
  try {
    const applicationWallets = await ApplicationWalletModel.find({
      userId: userId,
      walletId: walletId,
    });
    return applicationWallets;
  } catch (error) {
    console.log(error);
  }
};

const getApplicationWalletsByApplicationId = async (
  userId?: string,
  applicationId?: string
) => {
  try {
    const applicationWallets = await ApplicationWalletModel.find({
      userId: userId,
      applicationId: applicationId,
    });
    return applicationWallets;
  } catch (error) {
    console.log(error);
  }
};

const createApplicationWallet = async (
  applicationWallet: IApplicationWallet
) => {
  const applicationWalletModel = new ApplicationWalletModel(applicationWallet);
  try {
    const newApplicationWallet = await applicationWalletModel.save();
    return newApplicationWallet;
  } catch (error) {
    console.log(error);
  }
};

const deleteApplicationWallet = async (id: string) => {
  try {
    const applicationWallet = await ApplicationWalletModel.findByIdAndRemove(
      id
    );
    return applicationWallet;
  } catch (error) {
    console.log(error);
  }
};

const editApplicationWallet = async (id: string, body: any) => {
  const fields = Object.keys(ApplicationWalletModel.schema.obj);
  const editApplicationWallet = formatEditApplicationWallet(fields, body);
  try {
    const applicationWallet = await ApplicationWalletModel.findByIdAndUpdate(
      id,
      editApplicationWallet,
      {
        new: true,
      }
    );
    return applicationWallet;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getApplicationWallets,
  createApplicationWallet,
  deleteApplicationWallet,
  editApplicationWallet,
  getApplicationWalletsByWalletId,
  getApplicationWallet,
  getApplicationWalletsByApplicationId,
};
