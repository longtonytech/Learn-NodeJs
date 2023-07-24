import express from "express";
import applicationWalletsControllers from "@/modules/applicationWallets/applicationWallets.controllers";

const router = express.Router();

router.get("/", applicationWalletsControllers.getApplicationWallets);

router.get("/:id", applicationWalletsControllers.getApplicationWallet);

router.post("/", applicationWalletsControllers.createApplicationWallet);

router.delete("/:id", applicationWalletsControllers.deleteApplicationWallet);

router.put("/:id", applicationWalletsControllers.editApplicationWallet);

export default router;
