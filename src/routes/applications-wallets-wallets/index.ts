import express from "express";
const router = express.Router({ mergeParams: true });
import applicationsWalletsControllers from "@/modules/applications-wallets/applications-wallets.controllers";
import { verifyToken } from "@/middlewares/auth.middlewares";

router.delete(
  "/:walletId",
  [verifyToken],
  applicationsWalletsControllers.deleteApplicationWalletsByWalletId
);

router.get(
  "/:walletId",
  [verifyToken],
  applicationsWalletsControllers.getApplicationWalletsByWalletId
);

export default router;
