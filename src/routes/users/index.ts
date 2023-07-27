import express from "express";
import UsersControllers from "@/modules/users/users.controllers";
import usersWalletsRoutes from "@/routes/users-wallets";
import usersApplitcationsRoutes from "@/routes/users-applications";
import { validateMiddleWare } from "@/middlewares/validation.middleware";
import { validateUser } from "@/modules/users/users.models";

const router = express.Router();

router.use("/:userId/wallets", usersWalletsRoutes);

router.use("/:userId/applications", usersApplitcationsRoutes);

router.get("/", UsersControllers.getUsers);

router.get("/:userId", UsersControllers.getUser);

router.post(
  "/",
  [validateMiddleWare(validateUser)],
  UsersControllers.createUser
);

router.delete("/:userId", UsersControllers.deleteUser);

router.put(
  "/:userId",
  [validateMiddleWare(validateUser)],
  UsersControllers.editUser
);

export default router;
