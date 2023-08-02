import express from "express";
import applicationWalletsControllers from "@/modules/applications-wallets/applications-wallets.controllers";

import { verifyToken } from "@/middlewares/auth.middlewares";

const router = express.Router();

router.get(
  "/",
  [verifyToken],
  applicationWalletsControllers.getApplicationWallets
);
router.get(
  "/:applicationWalletId",
  [verifyToken],
  applicationWalletsControllers.getApplicationWallet
);
router.delete(
  "/:applicationWalletId",
  [verifyToken],
  applicationWalletsControllers.deleteApplicationWallet
);
router.put(
  "/:applicationWalletId",
  [verifyToken],
  applicationWalletsControllers.editApplicationWallet
);
router.get(
  "/wallets/:walletId",
  [verifyToken],
  applicationWalletsControllers.getApplicationWalletsByWalletId
);
router.get(
  "/applications/:applicationId",
  [verifyToken],
  applicationWalletsControllers.getApplicationWalletsByApplicationId
);

router.post(
  "/",
  [verifyToken],
  applicationWalletsControllers.createApplicationWallet
);

export default router;
