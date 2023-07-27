import express from "express";
const router = express.Router({ mergeParams: true });
import walletsControllers from "@/modules/wallets/wallets.controllers";

router.delete("/", walletsControllers.deleteWalletsByApplicationId);

router.get("/", walletsControllers.getWalletsByApplicationId);

export default router;
