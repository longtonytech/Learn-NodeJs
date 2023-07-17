import { IData, IResponse, IWallet } from "@/types";
import { readData, writeData } from "@/utils";
import { formatWallet } from "./wallets.utils";
let data: IData = readData();

const getWallets = () => {
  data = readData();
  const { wallets } = data;
  return wallets;
};
const getWallet = (id: string) => {
  data = readData();
  const { wallets } = data;
  const wallet = wallets?.find((wallet) => wallet.id === id);
  return wallet;
};
const getWalletByAddress = (address?: string) => {
  data = readData();
  const { wallets } = data;
  const wallet = wallets?.find((wallet) => wallet.walletAddress === address);
  return wallet;
};
const createdWallet = async (wallet: IWallet) => {
  const data: IData = readData();
  let res: IResponse = {};
  const { wallets } = data;
  const checkedWallet = getWalletByAddress(wallet.walletAddress);
  if (checkedWallet) {
    res.error = "Email has existed";
  } else {
    wallets?.push(wallet);
    const newData = JSON.stringify({ ...data, wallets });
    const err = await writeData(newData);
    res = {
      wallet: wallet,
      error: err,
    };
  }
  return res;
};

const deleteWallet = async (id: string) => {
  data = readData();
  let { wallets } = data;
  let res: IResponse = {};
  const deleteWallet = wallets?.find((wallet) => wallet.id === id);
  if (deleteWallet) {
    wallets = wallets?.filter((wallet) => wallet.id !== id);
    const newData = JSON.stringify({ ...data, wallets });
    const err = await writeData(newData);
    res = {
      wallet: deleteWallet,
      error: err,
    };
  } else {
    res.error = "Wallet not found";
  }
  return res;
};
const editWallet = async (id: string, newWallet: IWallet) => {
  data = readData();
  let { wallets } = data;
  let res: {
    wallet?: IWallet;
    error?: unknown | boolean;
  } = {};
  let editWallet = wallets?.find((wallet) => wallet.id === id);
  if (editWallet) {
    const checkedWallet = getWalletByAddress(newWallet.walletAddress);
    if (checkedWallet) {
      res.error = "Email has existed";
    } else {
      const newWallets = wallets?.map((wallet) => {
        if (wallet.id === id) {
          editWallet = formatWallet(newWallet, wallet);
          return editWallet;
        } else {
          return wallet;
        }
      });
      const newData = JSON.stringify({ ...data, wallets: newWallets });

      const err = await writeData(newData);
      res = {
        wallet: editWallet,
        error: err,
      };
    }
  } else {
    res.error = "Wallet not found";
  }
  return res;
};

export default {
  getWallets,
  getWallet,
  createdWallet,
  deleteWallet,
  editWallet,
};
