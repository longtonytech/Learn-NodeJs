import { Request, Response } from "express";
import UsersServices from "@/modules/users/users.services";
import { formatCreateUser } from "./users.utils";
import bcrypt from "bcrypt";
const saltRounds = 10;

const getUsers = async (_req: Request, res: Response) => {
  const users = await UsersServices.getUsers();
  if (users) {
    res.json(users);
  } else {
    res.status(404).json({
      message: "Sorry, cant find Users",
    });
  }
};
const getUser = async (req: Request, res: Response) => {
  const user = await UsersServices.getUserById(req.params.userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      message: "Sorry, cant find User",
    });
  }
};

const createUser = async (req: Request, res: Response) => {
  const user = formatCreateUser(req.body);
  const checkedUser = await UsersServices.getUserByEmail(user.email);
  if (checkedUser) {
    res.status(400).json({
      message: "Email has existed",
    });
    return;
  }
  const hashPassword = bcrypt.hashSync(user.password, saltRounds);
  const newUser = {
    ...user,
    password: hashPassword,
  };
  const resUser = await UsersServices.createUser(newUser);
  if (!resUser) {
    res.status(400).json({
      message: "Something wrong",
    });
  } else {
    res.json(resUser.email);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const deleteUser = await UsersServices.getUserById(req.params.userId);
  if (!deleteUser) {
    res.status(400).json({
      message: "User not found",
    });
    return;
  }
  const resUser = await UsersServices.deleteUser(deleteUser.id);
  if (!resUser) {
    res.status(500).json({
      message: "Something wrong",
    });
  } else {
    res.json(resUser);
  }
};

const editUser = async (req: Request, res: Response) => {
  const editUser = await UsersServices.getUserById(req.params.userId);
  if (!editUser) {
    res.status(400).json({
      message: "User not found",
    });
    return;
  }
  const checkedUser = await UsersServices.getUserByEmail(req.body.email);

  if (checkedUser) {
    res.status(400).json({
      message: "Email has existed",
    });
    return;
  }
  const resUser = await UsersServices.editUser(editUser.id, req.body);

  if (!resUser) {
    res.status(500).json({
      message: "Something wrong",
    });
  } else {
    res.json(resUser);
  }
};

export default { getUsers, getUser, createUser, deleteUser, editUser };
