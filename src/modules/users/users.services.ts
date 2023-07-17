import { IData, IResponse, IUser } from "@/types";
import { readData, writeData } from "@/utils";
import { formatEditUser } from "./users.utils";
let data: IData;

const getUsers = () => {
  data = readData();
  const { users } = data;
  return users;
};
const getUserById = (id: string) => {
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

const createUser = async (user: IUser) => {
  data = readData();
  let res: IResponse = {};
  const { users } = data;
  users?.push(user);
  const newData = JSON.stringify({ ...data, users });
  const err = await writeData(newData);
  res = {
    user: user,
    error: err,
  };
  return res;
};

const deleteUser = async (id: string) => {
  data = readData();
  let { users } = data;
  let res: IResponse = {};
  users = users?.filter((user) => user.id !== id);
  const newData = JSON.stringify({ ...data, users });
  const err = await writeData(newData);
  res = {
    error: err,
  };
  return res;
};

const editUser = async (id: string, newUser: IUser) => {
  data = readData();
  let { users } = data;
  let res: {
    user?: IUser;
    error?: unknown | boolean;
  } = {};

  const newUsers = users?.map((user) => {
    if (user.id === id) {
      const editUser = formatEditUser(newUser, user);
      res.user = editUser;
    } else {
      return user;
    }
  });
  const newData = JSON.stringify({ ...data, users: newUsers });
  const err = await writeData(newData);
  res.error = err;

  return res;
};

export default {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  editUser,
  getUserByEmail,
};
