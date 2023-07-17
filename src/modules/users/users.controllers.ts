import UsersServices from "@/modules/users/users.services";
import { Request, Response } from "express";
import { checkEmty, createdUser } from "./users.utils";
import { requiredUsersFields } from "./users.model";

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
  const errors = checkEmty(requiredUsersFields, user);
  if (Object.keys(errors).length === 0) {
    const response = await UsersServices.createdUser(user);
    if (response.error) {
      if (response.user) {
        res.status(500).json({
          message: response.error,
        });
      } else {
        res.status(400).json({
          message: response.error,
        });
      }
    } else {
      res.json(response.user);
    }
  } else {
    res.status(400).json(errors);
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
      message: response.error,
    });
  }
};
const editUser = async (req: Request, res: Response) => {
  const user = createdUser(req.body, req.params.id);
  const errors = checkEmty(requiredUsersFields, user);
  if (Object.keys(errors).length === 0) {
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
        message: response.error,
      });
    }
  } else {
    res.status(400).json(errors);
  }
};

export default { getUsers, getUser, createUser, deleteUser, editUser };
