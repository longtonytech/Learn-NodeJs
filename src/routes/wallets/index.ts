import express from "express";
import walletsControllers from "@/modules/wallets/wallets.controllers";

const router = express.Router();

router.get("/", walletsControllers.getWallets);

router.get("/:id", walletsControllers.getWallet);

router.post("/", walletsControllers.createWallet);

router.delete("/:id", walletsControllers.deleteWallet);

router.put("/:id", walletsControllers.editWallet);

export default router;
