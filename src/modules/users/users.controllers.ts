import { Request, Response } from "express";
import UsersServices from "@/modules/users/users.services";
import { formatCreateUser } from "./users.utils";
import bcrypt from "bcrypt";
import { IRequestType } from "@/types";
const saltRounds = 10;

const getUsers = async (req: Request & IRequestType, res: Response) => {
  try {
    const users = await UsersServices.getUsers();
    if (users) {
      res.json(users);
    }
  } catch (error) {
    res.status(404).json({
      message: (error as Error).message,
    });
  }
};
const getUser = async (req: Request, res: Response) => {
  try {
    const user = await UsersServices.getUserById(req.params.userId);
    if (user) {
      res.json(user);
    }
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const user = formatCreateUser(req.body);
    const checkedUser = await UsersServices.getUserByEmail(req.body.email);
    if (checkedUser) {
      return res.status(400).json({
        message: "Email has existed",
      });
    }
    const hashPassword = bcrypt.hashSync(user.password, saltRounds);
    const newUser = {
      ...user,
      password: hashPassword,
    };
    const resUser = await UsersServices.createUser(newUser);
    res.json({
      messsage: "success!",
      email: resUser.email,
    });
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleteUser = await UsersServices.getUserById(req.params.userId);
    const resUser = await UsersServices.deleteUser(deleteUser?.id);
    res.json(resUser);
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
};

const editUser = async (req: Request, res: Response) => {
  try {
    const editUser = await UsersServices.getUserById(req.params.userId);
    const checkedUser = await UsersServices.getUserByEmail(req.body.email);
    if (checkedUser) {
      return res.status(400).json({
        message: "Email has existed",
      });
    }
    const resUser = await UsersServices.editUser(editUser?.id, req.body);
    res.json(resUser);
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
};

export default { getUsers, getUser, createUser, deleteUser, editUser };
