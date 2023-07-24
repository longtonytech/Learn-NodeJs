import express from "express";
import UsersControllers from "@/modules/users/users.controllers";

const router = express.Router();

router.get("/", UsersControllers.getUsers);

router.get("/:id", UsersControllers.getUser);

router.post("/", UsersControllers.createUser);

router.delete("/:id", UsersControllers.deleteUser);

router.put("/:id", UsersControllers.editUser);

export default router;
