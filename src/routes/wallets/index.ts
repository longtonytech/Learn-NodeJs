import WalletsControllers from "@/modules/wallets/wallets.controllers";
import express from "express";

const router = express.Router();

router.get("/", WalletsControllers.getWallets);

router.get("/:id", WalletsControllers.getWallet);

router.post("/", WalletsControllers.createWallet);

router.delete("/:id", WalletsControllers.deleteWallet);

router.put("/:id", WalletsControllers.editWallet);

export default router;
