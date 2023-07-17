import { IData, IResponse, IUser } from "@/types";
import { readData, writeData } from "@/utils";
import { formatUser } from "./users.utils";
let data: IData = readData();

const getUsers = () => {
  data = readData();
  const { users } = data;
  return users;
};
const getUser = (id: string) => {
  data = readData();
  const { users } = data;
  const user = users?.find((user) => user.id === id);
  return user;
};
const getUserByEmail = (email?: string) => {
  data = readData();
  const { users } = data;
  const user = users?.find((user) => user.email === email);
  return user;
};
const createdUser = async (user: IUser) => {
  const data: IData = readData();
  let res: IResponse = {};
  const { users } = data;
  const checkedUser = getUserByEmail(user.email);
  if (checkedUser) {
    res.error = "Email has existed";
  } else {
    users?.push(user);
    const newData = JSON.stringify({ ...data, users });
    const err = await writeData(newData);
    res = {
      user: user,
      error: err,
    };
  }
  return res;
};

const deleteUser = async (id: string) => {
  const data: IData = readData();

  let { users } = data;
  let res: IResponse = {};
  const deleteUser = users?.find((user) => user.id === id);
  if (deleteUser) {
    users = users?.filter((user) => user.id !== id);
    const newData = JSON.stringify({ ...data, users });
    const err = await writeData(newData);
    res = {
      user: deleteUser,
      error: err,
    };
  } else {
    res.error = "User not found";
  }
  return res;
};
const editUser = async (id: string, newUser: IUser) => {
  const data: IData = readData();
  let { users } = data;
  let res: {
    user?: IUser;
    error?: unknown | boolean;
  } = {};
  let editUser = users?.find((user) => user.id === id);
  if (editUser) {
    const checkedUser = getUserByEmail(newUser.email);
    if (checkedUser) {
      res.error = "Email has existed";
    } else {
      const newUsers = users?.map((user) => {
        if (user.id === id) {
          editUser = formatUser(newUser, user);
          return editUser;
        } else {
          return user;
        }
      });
      const newData = JSON.stringify({ ...data, users: newUsers });

      const err = await writeData(newData);
      res = {
        user: editUser,
        error: err,
      };
    }
  } else {
    res.error = "User not found";
  }
  return res;
};

export default {
  getUsers,
  getUser,
  getUserByEmail,
  createdUser,
  deleteUser,
  editUser,
};
