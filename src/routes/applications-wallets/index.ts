import express from "express";
import applicationWalletsControllers from "@/modules/applications-wallets/applications-wallets.controllers";

import { verifyToken } from "@/middlewares/auth.middlewares";
import { validateMiddleWare } from "@/middlewares/validation.middleware";
import {
  validateCreateApplicationWallet,
  validateEditApplicationWallet,
} from "@/modules/applications-wallets/applications-wallets.validation";

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
  [validateMiddleWare(validateEditApplicationWallet)],
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
  [validateMiddleWare(validateCreateApplicationWallet)],
  applicationWalletsControllers.createApplicationWallet
);

export default router;
