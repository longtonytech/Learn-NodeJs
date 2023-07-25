import express from "express";
import applicationsControllers from "@/modules/applications/applications.controllers";

const router = express.Router({ mergeParams: true });

router.delete("/", applicationsControllers.deleteApplicationsByUserId);

router.get("/", applicationsControllers.getApplicationsByUserId);

export default router;
