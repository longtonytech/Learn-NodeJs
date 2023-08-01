import express from "express";
const router = express.Router({ mergeParams: true });
import applicationsWalletsControllers from "@/modules/applications-wallets/applications-wallets.controllers";
import { verifyToken } from "@/middlewares/auth.middlewares";

router.delete(
  "/:applicationId",
  [verifyToken],
  applicationsWalletsControllers.deleteApplicationWallet
);

router.put(
  "/:applicationId",
  [verifyToken],
  applicationsWalletsControllers.editApplicationWallet
);
router.get(
  "/:applicationId",
  [verifyToken],
  applicationsWalletsControllers.getApplicationWallet
);

export default router;
