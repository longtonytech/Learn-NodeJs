import express from "express";
import UsersControllers from "@/modules/users/users.controllers";
import usersWalletsRoutes from "@/routes/users-wallets";
import usersApplitcationsRoutes from "@/routes/users-applications";
import { validateMiddleWare } from "@/middlewares/validation.middleware";
import {
  validateCreateUser,
  validateEditUser,
} from "@/modules/users/users.validation";
import { verifyToken } from "@/middlewares/auth.middlewares";

const router = express.Router();

router.use("/:userId/wallets", [verifyToken], usersWalletsRoutes);

router.use("/:userId/applications", [verifyToken], usersApplitcationsRoutes);

router.get("/", [verifyToken], UsersControllers.getUsers);

router.get("/:userId", [verifyToken], UsersControllers.getUser);

router.post(
  "/",
  [validateMiddleWare(validateCreateUser)],
  [verifyToken],
  UsersControllers.createUser
);

router.delete("/:userId", [verifyToken], UsersControllers.deleteUser);

router.put(
  "/:userId",
  [validateMiddleWare(validateEditUser)],
  [verifyToken],
  UsersControllers.editUser
);

export default router;
