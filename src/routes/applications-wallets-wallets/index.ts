import express from "express";
const router = express.Router({ mergeParams: true });
import applicationsWalletsControllers from "@/modules/applications-wallets/applications-wallets.controllers";
import applicationWalletsWalletApplication from "@/routes/applications-wallets-wallet-aplication";

import { verifyToken } from "@/middlewares/auth.middlewares";
router.use(
  "/:walletId/applications",
  [verifyToken],
  applicationWalletsWalletApplication
);

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
