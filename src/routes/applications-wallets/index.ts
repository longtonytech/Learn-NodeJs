import express from "express";
import applicationWalletsControllers from "@/modules/applications-wallets/applications-wallets.controllers";
import applicationWalletsWalletsRoutes from "@/routes/applications-wallets-wallets";
import applicationWalletsApplicationsRoutes from "@/routes/applications-wallets-applications";
import { verifyToken } from "@/middlewares/auth.middlewares";

const router = express.Router();
router.use("/wallets", applicationWalletsWalletsRoutes);

router.use("/applications", applicationWalletsApplicationsRoutes);

router.get(
  "/",
  [verifyToken],
  applicationWalletsControllers.getApplicationWallets
);

router.post(
  "/",
  [verifyToken],
  applicationWalletsControllers.createApplicationWallet
);

// router.delete(
//   "/:applicationWalletId",
//   applicationWalletsControllers.deleteApplicationWallet
// );

// router.put(
//   "/:applicationWalletId",
//   applicationWalletsControllers.editApplicationWallet
// );

export default router;
