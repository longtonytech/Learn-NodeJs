import express from "express";
const router = express.Router({ mergeParams: true });
import applicationsControllers from "@/modules/applications/applications.controllers";

router.delete("/", applicationsControllers.deleteApplicationsByWalletId);

router.get("/", applicationsControllers.getApplicationsByWalletId);

export default router;
