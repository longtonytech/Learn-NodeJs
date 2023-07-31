import { Request, Response } from "express";
import WalletsServices from "@/modules/wallets/wallets.services";
import { formatCreateWallet } from "./wallets.utils";
import { IRequestType } from "@/types";

const getWalletsByUserId = async (
  req: Request & IRequestType,
  res: Response
) => {
  if (req.userId !== req.params.userId) {
    return res.status(400).json({
      message: "Unauthorized!",
    });
  }
  const wallets = await WalletsServices.getWallestByUserId(req.userId);
  if (wallets?.length && wallets.length > 0) {
    res.json(wallets);
  } else {
    res.status(404).json({
      message: "Sorry, cant find Wallets",
    });
  }
};

const getWallets = async (_req: Request, res: Response) => {
  const wallets = await WalletsServices.getWallets();
  if (wallets?.length && wallets.length > 0) {
    res.json(wallets);
  } else {
    res.status(404).json({
      message: "Sorry, cant find Wallets",
    });
  }
};

const getWallet = async (req: Request, res: Response) => {
  const wallet = await WalletsServices.getWalletById(req.params.walletId);
  if (wallet) {
    res.json(wallet);
  } else {
    res.status(404).json({
      message: "Sorry, cant find Wallet",
    });
  }
};

const createWallet = async (req: Request & IRequestType, res: Response) => {
  const wallet = formatCreateWallet(req);
  const checkedWallet = await WalletsServices.getWalletByAddress(
    wallet.walletAddress
  );
  if (checkedWallet) {
    res.status(400).json({
      message: "Wallet has existed",
    });
    return;
  }
  const resWallet = await WalletsServices.createWallet(wallet);
  if (!resWallet) {
    res.status(400).json({
      message: "Something wrong",
    });
  } else {
    res.json(resWallet);
  }
};

const deleteWallet = async (req: Request, res: Response) => {
  const deleteWallet = await WalletsServices.getWalletById(req.params.walletId);
  if (!deleteWallet) {
    res.status(400).json({
      message: "Wallet not found",
    });
    return;
  }
  const resWallet = await WalletsServices.deleteWallet(deleteWallet.id);
  if (!resWallet) {
    res.status(500).json({
      message: "Something wrong",
    });
  } else {
    res.json(resWallet);
  }
};
const deleteWalletsByUserId = async (
  req: Request & IRequestType,
  res: Response
) => {
  if (req.userId !== req.params.userId) {
    return res.status(400).json({
      message: "Unauthorized!",
    });
  }
  const deleteWallets = await WalletsServices.getWallestByUserId(
    req.params.userId
  );
  if (deleteWallets!.length > 0) {
    const resWallets = await Promise.all(
      deleteWallets!.map((deleteWallet) =>
        WalletsServices.deleteWallet(deleteWallet.id)
      )
    );
    res.json(resWallets);
  } else {
    res.status(400).json({
      message: "Wallets not found",
    });
  }
};

const editWallet = async (req: Request, res: Response) => {
  const editWallet = await WalletsServices.getWalletById(req.params.walletId);
  if (!editWallet) {
    res.status(400).json({
      message: "Wallet not found",
    });
    return;
  }
  const checkedWallet = await WalletsServices.getWalletByAddress(
    req.body.walletAddress
  );

  if (checkedWallet) {
    res.status(400).json({
      message: "WalletAddress has existed",
    });
    return;
  }
  const resWallet = await WalletsServices.editWallet(editWallet.id, req.body);

  if (!resWallet) {
    res.status(500).json({
      message: "Something wrong",
    });
  } else {
    res.json(resWallet);
  }
};

export default {
  getWallets,
  getWallet,
  createWallet,
  deleteWallet,
  editWallet,
  deleteWalletsByUserId,
  getWalletsByUserId,
};
