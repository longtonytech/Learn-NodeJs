import ApplicationsControllers from "@/modules/applications/applications.controllers";
import express from "express";

const router = express.Router();

router.get("/", ApplicationsControllers.getApplications);

router.get("/:id", ApplicationsControllers.getApplication);

router.post("/", ApplicationsControllers.createApplication);

router.delete("/:id", ApplicationsControllers.deleteApplication);

router.put("/:id", ApplicationsControllers.editApplication);

export default router;
