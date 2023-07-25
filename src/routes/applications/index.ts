import express from "express";
import applicationsControllers from "@/modules/applications/applications.controllers";

const router = express.Router({ mergeParams: true });

router.get("/", applicationsControllers.getApplications);

router.get("/:id", applicationsControllers.getApplication);

router.post("/", applicationsControllers.createApplication);

router.delete("/:id", applicationsControllers.deleteApplication);

router.put("/:id", applicationsControllers.editApplication);

export default router;
