import { IApplicationWallet } from "@/types";
import { ApplicationWalletModel } from "./application-wallets.models";
import { formatEditApplicationWallet } from "./application-wallets.utils";

const getApplicationWallets = async () => {
  let applicationWallets: IApplicationWallet[] = [];
  try {
    applicationWallets = await ApplicationWalletModel.find({});
    return applicationWallets;
  } catch (error) {
    console.log(error);
  }
};
const getApplicationWalletById = async (id: string) => {
  try {
    const applicationWallet = await ApplicationWalletModel.findById(id);
    return applicationWallet;
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
  getApplicationWalletById,
  createApplicationWallet,
  deleteApplicationWallet,
  editApplicationWallet,
};
