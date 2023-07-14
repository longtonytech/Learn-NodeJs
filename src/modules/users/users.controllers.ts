import UsersServices from "@/modules/users/users.services";
import { IUser } from "@/types";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const createdUser = (body: any, id?: string): IUser => ({
  id: id || uuidv4().slice(0, 8),
  name: body.name,
  email: body.email,
  phone: body.phone,
  createdAt: body.createdAt,
  updatedAt: body.updatedAt,
});
const getUsers = (_req: Request, res: Response) => {
  const users = UsersServices.getUsers();
  if (users) {
    res.json(users);
  } else {
    res.status(404).json("Sorry, cant find Users");
  }
};
const getUser = (req: Request, res: Response) => {
  const user = UsersServices.getUser(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json("Sorry, cant find User");
  }
};
const createUser = async (req: Request, res: Response) => {
  const user = createdUser(req.body);
  const err = UsersServices.createdUser(user);
  if (err) {
    res.status(500).json({
      message: err,
    });
  } else {
    res.json(user);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const response = await UsersServices.deleteUser(req.params.id);
  if (response.user) {
    if (response.error) {
      res.status(500).json({
        message: response.error,
      });
    } else {
      res.json(response.user);
    }
  } else {
    res.status(400).json({
      message: "User not found",
    });
  }
};
const editUser = async (req: Request, res: Response) => {
  const user = createdUser(req.body, req.params.id);
  const response = await UsersServices.editUser(req.params.id, user);
  if (response.user) {
    if (response.error) {
      res.status(500).json({
        message: response.error,
      });
    } else {
      res.json(response.user);
    }
  } else {
    res.status(400).json({
      message: "User not found",
    });
  }
};

export default { getUsers, getUser, createUser, deleteUser, editUser };
