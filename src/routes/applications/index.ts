import express from "express";
import applicationsControllers from "@/modules/applications/applications.controllers";
import { verifyToken } from "@/middlewares/auth.middlewares";

const router = express.Router({ mergeParams: true });

router.get("/", [verifyToken], applicationsControllers.getApplicationsByUserId);

router.get(
  "/:applicationId",
  [verifyToken],
  applicationsControllers.getApplication
);

router.post("/", [verifyToken], applicationsControllers.createApplication);

router.delete(
  "/:applicationId",
  [verifyToken],
  applicationsControllers.deleteApplication
);

router.put(
  "/:applicationId",
  [verifyToken],
  applicationsControllers.editApplication
);

export default router;
