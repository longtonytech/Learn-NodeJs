import { IApplicationWallet, IData } from "@/types";
import { readData, writeData } from "@/utils";
import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();

const router = express.Router();
const createdAplicationWallet = (
  req: Request,
  id?: string
): IApplicationWallet => ({
  id: id || uuidv4().slice(0, 8),
  userId: req.body.userId,
  walletId: req.body.walletId,
  applicationId: req.body.applicationId,
  createdAt: req.body.createdAt,
});
let response: IData = {};

response = readData();
router.get("/", (_req: Request, res: Response) => {
  const { applicationWallets } = response;
  if (applicationWallets) {
    res.json(applicationWallets);
  } else {
    res.status(404).json("Sorry, cant find ApplicationWallet");
  }
});

router.get("/:id", (req: Request, res: Response) => {
  const { applicationWallets } = response;
  const applicationWallet = applicationWallets?.find(
    (applicationWallet) => applicationWallet.id === req.params.id
  );
  if (applicationWallet) {
    res.json(applicationWallet);
  } else {
    res.status(404).json("Sorry, cant find applicationWallet");
  }
});

router.post("/", jsonParser, async (req: Request, res: Response) => {
  const applicationWallet = createdAplicationWallet(req);
  const { applicationWallets } = response;
  applicationWallets?.push(applicationWallet);
  const newData = JSON.stringify({ ...response, applicationWallets });
  const err = await writeData(newData);
  if (err) {
    res.status(500).json({
      message: err,
    });
  } else {
    res.json(applicationWallet);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  let { applicationWallets } = response;
  const deleteApplicationWallet = applicationWallets?.find(
    (applicationWallet) => applicationWallet.id === req.params.id
  );
  if (deleteApplicationWallet) {
    applicationWallets = applicationWallets?.filter(
      (applicationWallet) => applicationWallet.id !== req.params.id
    );
    const newData = JSON.stringify({ ...response, applicationWallets });
    const err = await writeData(newData);
    if (err) {
      res.status(500).json({
        message: err,
      });
    } else {
      res.json(deleteApplicationWallet);
    }
  } else {
    res.status(400).json({
      message: "ApplicationWallet not found",
    });
  }
});

router.put("/:id", jsonParser, (req: Request, res: Response) => {
  const { applicationWallets } = response;
  let editApplicationWallet = applicationWallets?.find(
    (applicationWallet) => applicationWallet.id === req.params.id
  );
  if (editApplicationWallet) {
    const newApplicationWallets = applicationWallets?.map(
      (applicationWallet) => {
        if (applicationWallet.id === req.params.id) {
          editApplicationWallet = createdAplicationWallet(req, req.params.id);
          return editApplicationWallet;
        } else {
          return applicationWallet;
        }
      }
    );

    const newData = JSON.stringify({
      ...response,
      applicationWallets: newApplicationWallets,
    });
    const err = writeData(newData);
    if (err) {
      res.status(500).json({
        message: err,
      });
    } else {
      res.json(editApplicationWallet);
    }
  } else {
    res.status(400).json({
      message: "ApplicationWallet not found",
    });
  }
});

export default router;
