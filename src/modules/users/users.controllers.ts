import { Request, Response } from "express";
import UsersServices from "@/modules/users/users.services";
import { checkEmty, formatCreateUser } from "./users.utils";
import { requiredUsersFields } from "./users.models";

const getUsers = (_req: Request, res: Response) => {
  const users = UsersServices.getUsers();
  if (users) {
    res.json(users);
  } else {
    res.status(404).json("Sorry, cant find Users");
  }
};
const getUser = (req: Request, res: Response) => {
  const user = UsersServices.getUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json("Sorry, cant find User");
  }
};

const createUser = async (req: Request, res: Response) => {
  const user = formatCreateUser(req.body);
  const errors = checkEmty(requiredUsersFields, user);
  if (Object.keys(errors).length !== 0) {
    res.status(400).json(errors);
    return;
  }
  const checkedUser = UsersServices.getUserByEmail(user.email);
  if (checkedUser) {
    res.status(400).json({
      message: "Email has existed",
    });
    return;
  }
  const response = await UsersServices.createUser(user);
  if (response.error) {
    res.status(400).json({
      message: response.error,
    });
  } else {
    res.json(response.user);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const deleteUser = UsersServices.getUserById(req.params.id);
  if (!deleteUser) {
    res.status(400).json({
      message: "User not found",
    });
    return;
  }
  const response = await UsersServices.deleteUser(req.params.id);
  if (response.error) {
    res.status(500).json({
      message: response.error,
    });
  } else {
    res.json(deleteUser);
  }
};

const editUser = async (req: Request, res: Response) => {
  const errors = checkEmty(requiredUsersFields, req.body);
  if (Object.keys(errors).length !== 0) {
    res.status(400).json(errors);
    return;
  }
  let editUser = UsersServices.getUserById(req.params.id);
  if (!editUser) {
    res.status(400).json({
      message: "User not found",
    });
    return;
  }
  const checkedUser = UsersServices.getUserByEmail(req.body.email);
  if (checkedUser) {
    res.status(400).json({
      message: "Email has existed",
    });
    return;
  }
  const response = await UsersServices.editUser(req.params.id, req.body);

  if (response.error) {
    res.status(500).json({
      message: response.error,
    });
  } else {
    res.json(response.user);
  }
};

export default { getUsers, getUser, createUser, deleteUser, editUser };
