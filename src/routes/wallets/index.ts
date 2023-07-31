import express from "express";
import walletsControllers from "@/modules/wallets/wallets.controllers";
import { verifyToken } from "@/middlewares/auth.middlewares";

const router = express.Router({ mergeParams: true });

router.get("/", [verifyToken], walletsControllers.getWallets);

router.get("/:walletId", [verifyToken], walletsControllers.getWallet);

router.post("/", [verifyToken], walletsControllers.createWallet);

router.delete("/:walletId", [verifyToken], walletsControllers.deleteWallet);

router.put("/:walletId", [verifyToken], walletsControllers.editWallet);

export default router;
