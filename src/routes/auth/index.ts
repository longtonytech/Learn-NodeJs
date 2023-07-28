import express from "express";
import UsersControllers from "@/modules/users/users.controllers";
import AuthControllers from "@/modules/auth/auth.controllers";
import { validateCreateUser } from "@/modules/users/users.validation";
import { validateMiddleWare } from "@/middlewares/validation.middleware";

const router = express.Router();

router.post(
  "/register",
  [validateMiddleWare(validateCreateUser)],
  UsersControllers.createUser
);
router.post("/login", AuthControllers.login);

export default router;
