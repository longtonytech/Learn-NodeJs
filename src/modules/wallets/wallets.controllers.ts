import WalletsServices from "@/modules/wallets/wallets.services";
import { Request, Response } from "express";
import { checkEmty, createdWallet } from "./wallets.utils";
import { requiredWalletsFields } from "./wallets.models";

const getWallets = (_req: Request, res: Response) => {
  const wallets = WalletsServices.getWallets();
  if (wallets) {
    res.json(wallets);
  } else {
    res.status(404).json("Sorry, cant find Wallets");
  }
};
const getWallet = (req: Request, res: Response) => {
  const wallet = WalletsServices.getWallet(req.params.id);
  if (wallet) {
    res.json(wallet);
  } else {
    res.status(404).json("Sorry, cant find Wallet");
  }
};

const createWallet = async (req: Request, res: Response) => {
  const wallet = createdWallet(req.body);
  const errors = checkEmty(requiredWalletsFields, wallet);
  if (Object.keys(errors).length === 0) {
    const response = await WalletsServices.createdWallet(wallet);
    if (response.error) {
      if (response.wallet) {
        res.status(500).json({
          message: response.error,
        });
      } else {
        res.status(400).json({
          message: response.error,
        });
      }
    } else {
      res.json(response.wallet);
    }
  } else {
    res.status(400).json(errors);
  }
};

const deleteWallet = async (req: Request, res: Response) => {
  const response = await WalletsServices.deleteWallet(req.params.id);
  if (response.wallet) {
    if (response.error) {
      res.status(500).json({
        message: response.error,
      });
    } else {
      res.json(response.wallet);
    }
  } else {
    res.status(400).json({
      message: response.error,
    });
  }
};
const editWallet = async (req: Request, res: Response) => {
  const wallet = createdWallet(req.body, req.params.id);
  const errors = checkEmty(requiredWalletsFields, wallet);
  if (Object.keys(errors).length === 0) {
    const response = await WalletsServices.editWallet(req.params.id, wallet);
    if (response.wallet) {
      if (response.error) {
        res.status(500).json({
          message: response.error,
        });
      } else {
        res.json(response.wallet);
      }
    } else {
      res.status(400).json({
        message: response.error,
      });
    }
  } else {
    res.status(400).json(errors);
  }
};

export default {
  getWallets,
  getWallet,
  createWallet,
  deleteWallet,
  editWallet,
};
