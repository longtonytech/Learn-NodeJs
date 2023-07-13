import { IData, IWallet } from "@/types";
import { readData, writeData } from "@/utils";
import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();

const router = express.Router();
const createdWallet = (req: Request, id?: string): IWallet => ({
  id: id || uuidv4().slice(0, 8),
  userId: req.body.userId,
  walletAddress: req.body.walletAddress,
  amountOfMoney: req.body.amountOfMoney,
  privateKey: req.body.privateKey,
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

router.post("/", jsonParser, async (req: Request, res: Response) => {
  const wallet = createdWallet(req);
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

router.put("/:id", jsonParser, (req: Request, res: Response) => {
  const { wallets } = response;
  let editWallet = wallets?.find((wallet) => wallet.id === req.params.id);
  if (editWallet) {
    const newWallets = wallets?.map((wallet) => {
      if (wallet.id === req.params.id) {
        editWallet = createdWallet(req, req.params.id);
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
