import { Request, Response } from "express";
import ApplicationWalletsServices from "@/modules/applications-wallets/applications-wallets.services";
import { formatCreateApplicationWallet } from "./applications-wallets.utils";
import { IRequestType } from "@/types";
import UsersServices from "@/modules/users/users.services";
import WalletsServices from "@/modules/wallets/wallets.services";
import ApplicationsServices from "@/modules/applications/applications.services";

const getApplicationWallets = async (
  req: Request & IRequestType,
  res: Response
) => {
  try {
    const applicationWallets =
      await ApplicationWalletsServices.getApplicationWallets(req.userId);
    if (applicationWallets?.length && applicationWallets.length > 0) {
      res.json(applicationWallets);
    } else {
      res.status(404).json({
        message: "Sorry, cant find ApplicationWallets",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
};
const getApplicationWallet = async (req: Request, res: Response) => {
  try {
    const applicationWallet =
      await ApplicationWalletsServices.getApplicationWalletById(
        req.params.applicationWalletId
      );
    if (applicationWallet) {
      res.json(applicationWallet);
    } else {
      res.status(404).json({
        message: "Sorry, cant find ApplicationWallet",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
};

const getApplicationWalletsByWalletId = async (
  req: Request & IRequestType,
  res: Response
) => {
  try {
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
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
};
const getApplicationWalletsByApplicationId = async (
  req: Request & IRequestType,
  res: Response
) => {
  try {
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
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
};

const createApplicationWallet = async (
  req: Request & IRequestType,
  res: Response
) => {
  try {
    const user = UsersServices.getUserById(req.userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const wallet = WalletsServices.getWalletById(req.body.walletId);
    if (!wallet) {
      return res.status(400).json({
        message: "Wallet not found",
      });
    }
    const application = ApplicationsServices.getApplicationById(
      req.body.applicationId
    );
    if (!application) {
      return res.status(400).json({
        message: "Application not found",
      });
    }

    const applicationWallet = formatCreateApplicationWallet(req);
    const checkedApplicationWallet =
      await ApplicationWalletsServices.getApplicationWallet(applicationWallet);
    if (checkedApplicationWallet) {
      return res.status(400).json({
        message: "ApplicationWallet has existed",
      });
    }
    const resApplicationWallet =
      await ApplicationWalletsServices.createApplicationWallet(
        applicationWallet
      );
    if (!resApplicationWallet) {
      res.status(400).json({
        message: "Something wrong",
      });
    } else {
      res.json(resApplicationWallet);
    }
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
};

const editApplicationWallet = async (req: Request, res: Response) => {
  try {
    const resApplicationWallet =
      await ApplicationWalletsServices.editApplicationWallet(
        req.body.name,
        req.params.applicationWalletId
      );

    // if (!resApplicationWallet) {
    //   res.status(500).json({
    //     message: "Something wrong",
    //   });

    res.json(resApplicationWallet);
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
};

const deleteApplicationWallet = async (req: Request, res: Response) => {
  try {
    const resApplicationWallet =
      await ApplicationWalletsServices.deleteApplicationWallet(
        req.params.applicationWalletId
      );

    if (!resApplicationWallet) {
      res.status(500).json({
        message: "Something wrong",
      });
    } else {
      res.json(resApplicationWallet);
    }
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
};

export default {
  getApplicationWallets,
  createApplicationWallet,
  getApplicationWalletsByWalletId,
  getApplicationWalletsByApplicationId,
  editApplicationWallet,
  getApplicationWallet,
  deleteApplicationWallet,
};
