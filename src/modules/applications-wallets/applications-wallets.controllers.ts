import { Request, Response } from "express";
import ApplicationWalletsServices from "@/modules/applications-wallets/applications-wallets.services";
import { formatCreateApplicationWallet } from "./applications-wallets.utils";
import { IRequestType } from "@/types";

const getApplicationWallets = async (
  req: Request & IRequestType,
  res: Response
) => {
  const applicationWallets =
    await ApplicationWalletsServices.getApplicationWallets(req.userId);
  if (applicationWallets?.length && applicationWallets.length > 0) {
    res.json(applicationWallets);
  } else {
    res.status(404).json({
      message: "Sorry, cant find ApplicationWallets",
    });
  }
};
const getApplicationWallet = async (
  req: Request & IRequestType,
  res: Response
) => {
  const applicationWallet =
    await ApplicationWalletsServices.getApplicationWallet({
      userId: req.userId,
      walletId: req.params.walletId,
      applicationId: req.params.applicationId,
    });
  if (applicationWallet) {
    res.json(applicationWallet);
  } else {
    res.status(404).json({
      message: "Sorry, cant find ApplicationWallet",
    });
  }
};

const getApplicationWalletsByWalletId = async (
  req: Request & IRequestType,
  res: Response
) => {
  const applicationWallets =
    await ApplicationWalletsServices.getApplicationWalletsByWalletId(
      req.userId,
      req.params.walletId
    );
  if (applicationWallets?.length && applicationWallets.length > 0) {
    res.json(applicationWallets);
  } else {
    res.status(404).json({
      message: "Sorry, cant find ApplicationWallets",
    });
  }
};
const getApplicationWalletsByApplicationId = async (
  req: Request & IRequestType,
  res: Response
) => {
  const applicationWallets =
    await ApplicationWalletsServices.getApplicationWalletsByApplicationId(
      req.userId,
      req.params.applicationId
    );
  if (applicationWallets?.length && applicationWallets.length > 0) {
    res.json(applicationWallets);
  } else {
    res.status(404).json({
      message: "Sorry, cant find ApplicationWallets",
    });
  }
};

const createApplicationWallet = async (
  req: Request & IRequestType,
  res: Response
) => {
  const applicationWallet = formatCreateApplicationWallet(req);
  const checkedApplicationWallet =
    await ApplicationWalletsServices.getApplicationWallet(applicationWallet);
  if (checkedApplicationWallet) {
    res.status(400).json({
      message: "ApplicationWallet has existed",
    });
    return;
  }
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

const deleteApplicationWalletsByWalletId = async (
  req: Request & IRequestType,
  res: Response
) => {
  const deleteApplicationWallets =
    await ApplicationWalletsServices.getApplicationWalletsByWalletId(
      req.userId,
      req.params.walletId
    );
  if (deleteApplicationWallets!.length > 0) {
    const resApplicationWallets = await Promise.all(
      deleteApplicationWallets!.map((deleteApplicationWallet) =>
        ApplicationWalletsServices.deleteApplicationWallet(
          deleteApplicationWallet.id
        )
      )
    );
    res.json(resApplicationWallets);
  } else {
    res.status(400).json({
      message: "ApplicationWallets not found",
    });
  }
};
const deleteApplicationWalletsByApplicationId = async (
  req: Request & IRequestType,
  res: Response
) => {
  const deleteApplicationWallets =
    await ApplicationWalletsServices.getApplicationWalletsByApplicationId(
      req.userId,
      req.params.applicationId
    );
  if (deleteApplicationWallets!.length > 0) {
    const resApplicationWallets = await Promise.all(
      deleteApplicationWallets!.map((deleteApplicationWallet) =>
        ApplicationWalletsServices.deleteApplicationWallet(
          deleteApplicationWallet.id
        )
      )
    );
    res.json(resApplicationWallets);
  } else {
    res.status(400).json({
      message: "ApplicationWallets not found",
    });
  }
};

const editApplicationWallet = async (
  req: Request & IRequestType,
  res: Response
) => {
  const resApplicationWallet =
    await ApplicationWalletsServices.editApplicationWallet(req.body, {
      userId: req.userId,
      walletId: req.params.walletId,
      applicationId: req.params.applicationId,
    });

  if (!resApplicationWallet) {
    res.status(500).json({
      message: "Something wrong",
    });
  } else {
    res.json(resApplicationWallet);
  }
};

const deleteApplicationWallet = async (
  req: Request & IRequestType,
  res: Response
) => {
  const resApplicationWallet =
    await ApplicationWalletsServices.deleteApplicationWallet({
      userId: req.userId,
      walletId: req.params.walletId,
      applicationId: req.params.applicationId,
    });

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
  createApplicationWallet,
  getApplicationWalletsByWalletId,
  deleteApplicationWalletsByWalletId,
  getApplicationWalletsByApplicationId,
  deleteApplicationWalletsByApplicationId,
  editApplicationWallet,
  getApplicationWallet,
  deleteApplicationWallet,
};
