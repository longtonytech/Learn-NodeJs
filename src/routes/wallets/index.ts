import express from "express";
import walletsControllers from "@/modules/wallets/wallets.controllers";
import applications from "@/routes/applications";

const router = express.Router({ mergeParams: true });

router.use("/:walletId/applications", applications);

router.get("/", walletsControllers.getWallets);

router.get("/:walletId", walletsControllers.getWallet);

router.post("/", walletsControllers.createWallet);

router.delete("/:walletId", walletsControllers.deleteWallet);

router.put("/:walletId", walletsControllers.editWallet);

export default router;
