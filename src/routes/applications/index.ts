import express from "express";
import applicationsControllers from "@/modules/applications/applications.controllers";
import applicationsWalletsRoutes from "@/routes/applications-wallets";

const router = express.Router({ mergeParams: true });

router.use("/:applicationId/wallets", applicationsWalletsRoutes);

router.get("/", applicationsControllers.getApplications);

router.get("/:applicationId", applicationsControllers.getApplication);

router.post("/", applicationsControllers.createApplication);

router.delete("/:applicationId", applicationsControllers.deleteApplication);

router.put("/:applicationId", applicationsControllers.editApplication);

export default router;
