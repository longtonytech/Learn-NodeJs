import express from "express";
import applicationsControllers from "@/modules/applications/applications.controllers";
import { verifyToken } from "@/middlewares/auth.middlewares";

const router = express.Router({ mergeParams: true });

router.get("/", applicationsControllers.getApplications);

router.get("/:applicationId", applicationsControllers.getApplication);

router.post("/", [verifyToken], applicationsControllers.createApplication);

router.delete("/:applicationId", applicationsControllers.deleteApplication);

router.put("/:applicationId", applicationsControllers.editApplication);

export default router;
