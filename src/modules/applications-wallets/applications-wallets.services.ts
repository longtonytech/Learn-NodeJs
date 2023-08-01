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

const deleteApplicationWallet = async (
  applicationWallet?: IApplicationWallet
) => {
  try {
    const resApplicationWallet = await ApplicationWalletModel.findOneAndRemove(
      applicationWallet
    );
    return resApplicationWallet;
  } catch (error) {
    console.log(error);
  }
};

const editApplicationWallet = async (
  body: any,
  applicationWallet: IApplicationWallet
) => {
  try {
    const resApplicationWallet = await ApplicationWalletModel.findOneAndUpdate(
      applicationWallet,
      { name: body.name },
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
};
