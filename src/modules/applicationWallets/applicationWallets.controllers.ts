import { Request, Response } from "express";
import ApplicationWalletsServices from "@/modules/applicationWallets/applicationWallets.services";
import { formatCreateApplicationWallet } from "./applicationWallets.utils";

const getApplicationWallets = async (_req: Request, res: Response) => {
  const applicationWallets =
    await ApplicationWalletsServices.getApplicationWallets();
  if (applicationWallets) {
    res.json(applicationWallets);
  } else {
    res.status(404).json({
      message: "Sorry, cant find ApplicationWallets",
    });
  }
};
const getApplicationWallet = async (req: Request, res: Response) => {
  const applicationWallet =
    await ApplicationWalletsServices.getApplicationWalletById(req.params.id);
  if (applicationWallet) {
    res.json(applicationWallet);
  } else {
    res.status(404).json({
      message: "Sorry, cant find ApplicationWallet",
    });
  }
};

const createApplicationWallet = async (req: Request, res: Response) => {
  const applicationWallet = formatCreateApplicationWallet(req.body);
  const resApplicationWallet =
    await ApplicationWalletsServices.createApplicationWallet(applicationWallet);
  if (!resApplicationWallet) {
    res.status(400).json({
      message: "Something wrong",
    });
  } else {
    res.json(resApplicationWallet);
  }
};

const deleteApplicationWallet = async (req: Request, res: Response) => {
  const deleteApplicationWallet =
    await ApplicationWalletsServices.getApplicationWalletById(req.params.id);
  if (!deleteApplicationWallet) {
    res.status(400).json({
      message: "ApplicationWallet not found",
    });
    return;
  }
  const resApplicationWallet =
    await ApplicationWalletsServices.deleteApplicationWallet(req.params.id);
  if (!resApplicationWallet) {
    res.status(500).json({
      message: "Something wrong",
    });
  } else {
    res.json(resApplicationWallet);
  }
};

const editApplicationWallet = async (req: Request, res: Response) => {
  let editApplicationWallet =
    await ApplicationWalletsServices.getApplicationWalletById(req.params.id);
  if (!editApplicationWallet) {
    res.status(400).json({
      message: "ApplicationWallet not found",
    });
    return;
  }

  const resApplicationWallet =
    await ApplicationWalletsServices.editApplicationWallet(
      req.params.id,
      req.body
    );
  if (!resApplicationWallet) {
    res.status(500).json({
      message: "Something wrong",
    });
  } else {
    res.json(resApplicationWallet);
  }
};

export default {
  getApplicationWallets,
  getApplicationWallet,
  createApplicationWallet,
  deleteApplicationWallet,
  editApplicationWallet,
};
