import { IApplicationWallet } from "@/types";
import { ApplicationWalletModel } from "@/modules/applications-wallets/applications-wallets.models";

const getApplicationWallets = async (userId?: string) => {
  let applicationWallets: IApplicationWallet[] = [];
  try {
    applicationWallets = await ApplicationWalletModel.find({ userId: userId });
    return applicationWallets;
  } catch (error) {
    console.log(error);
  }
};

const getApplicationWalletById = async (applicationWalletId: string) => {
  try {
    const resApplicationWallet = await ApplicationWalletModel.findById(
      applicationWalletId
    );
    return resApplicationWallet;
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

const deleteApplicationWallet = async (applicationWalletId?: string) => {
  try {
    const resApplicationWallet = await ApplicationWalletModel.findByIdAndRemove(
      applicationWalletId
    );
    return resApplicationWallet;
  } catch (error) {
    console.log(error);
  }
};

const editApplicationWallet = async (
  name: string,
  applicationWalletId: string
) => {
  try {
    const resApplicationWallet = await ApplicationWalletModel.findByIdAndUpdate(
      applicationWalletId,
      { name: name },
      {
        new: true,
      }
    );
    return resApplicationWallet;
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
  getApplicationWalletById,
};
