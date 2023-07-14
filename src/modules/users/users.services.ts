import { IData, IUser } from "@/types";
import { readData, writeData } from "@/utils";
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
const createdUser = async (user: IUser) => {
  const data: IData = readData();
  const { users } = data;
  users?.push(user);
  const newData = JSON.stringify({ ...data, users });
  const err = await writeData(newData);
  return err;
};

const deleteUser = async (id: string) => {
  const data: IData = readData();

  let { users } = data;
  let res: {
    user?: IUser;
    error?: unknown | boolean;
  } = {};
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
    const newUsers = users?.map((user) => {
      if (user.id === id) {
        return newUser;
      } else {
        return user;
      }
    });
    const newData = JSON.stringify({ ...data, users: newUsers });

    const err = await writeData(newData);
    res = {
      user: newUser,
      error: err,
    };
  } else {
    res.error = "User not found";
  }
  return res;
};

export default { getUsers, getUser, createdUser, deleteUser, editUser };
