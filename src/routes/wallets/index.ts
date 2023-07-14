import { IData, IWallet } from "@/types";
import { readData, writeData } from "@/utils";
import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();
const createdWallet = (body: any, id?: string): IWallet => ({
  id: id || uuidv4().slice(0, 8),
  userId: body.userId,
  walletAddress: body.walletAddress,
  amountOfMoney: body.amountOfMoney,
  privateKey: body.privateKey,
});
let response: IData = {};

response = readData();
router.get("/", (_req: Request, res: Response) => {
  const { wallets } = response;
  if (wallets) {
    res.json(wallets);
  } else {
    res.status(404).json("Sorry, cant find Wallets");
  }
});

router.get("/:id", (req: Request, res: Response) => {
  const { wallets } = response;
  const wallet = wallets?.find((wallet) => wallet.id === req.params.id);
  if (wallet) {
    res.json(wallet);
  } else {
    res.status(404).json("Sorry, cant find Wallet");
  }
});

router.post("/", async (req: Request, res: Response) => {
  const wallet = createdWallet(req.body);
  const { wallets } = response;
  wallets?.push(wallet);
  const newData = JSON.stringify({ ...response, wallets });
  const err = await writeData(newData);
  if (err) {
    res.status(500).json({
      message: err,
    });
  } else {
    res.json(wallet);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  let { wallets } = response;
  const deleteWallet = wallets?.find((wallet) => wallet.id === req.params.id);
  if (deleteWallet) {
    wallets = wallets?.filter((wallet) => wallet.id !== req.params.id);
    const newData = JSON.stringify({ ...response, wallets });
    const err = await writeData(newData);
    if (err) {
      res.status(500).json({
        message: err,
      });
    } else {
      res.json(deleteWallet);
    }
  } else {
    res.status(400).json({
      message: "Wallet not found",
    });
  }
});

router.put("/:id", (req: Request, res: Response) => {
  const { wallets } = response;
  let editWallet = wallets?.find((wallet) => wallet.id === req.params.id);
  if (editWallet) {
    const newWallets = wallets?.map((wallet) => {
      if (wallet.id === req.params.id) {
        editWallet = createdWallet(req.body, req.params.id);
        return editWallet;
      } else {
        return wallet;
      }
    });

    const newData = JSON.stringify({ ...response, wallets: newWallets });
    const err = writeData(newData);
    if (err) {
      res.status(500).json({
        message: err,
      });
    } else {
      res.json(editWallet);
    }
  } else {
    res.status(400).json({
      message: "Wallet not found",
    });
  }
});

export default router;
