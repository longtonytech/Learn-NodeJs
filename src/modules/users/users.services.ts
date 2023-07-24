import { IUser } from "@/types";
import { formatEditUser } from "./users.utils";
import { UserModel } from "./users.models";

const getUsers = async () => {
  let users: IUser[] = [];
  try {
    users = await UserModel.find({});
    return users;
  } catch (error) {
    console.log(error);
  }
};
const getUserById = async (id: string) => {
  try {
    const user = await UserModel.findById(id);
    return user;
  } catch (error) {
    console.log(error);
  }
};
const getUserByEmail = async (email?: string) => {
  try {
    const [user] = await UserModel.find({ email: email });
    return user;
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (user: IUser) => {
  const userModel = new UserModel(user);
  try {
    const newUser = await userModel.save();
    return newUser;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id: string) => {
  try {
    const user = await UserModel.findByIdAndRemove(id);
    return user;
  } catch (error) {
    console.log(error);
  }
};

const editUser = async (id: string, body: any) => {
  const fields = Object.keys(UserModel.schema.obj);
  const editUser = formatEditUser(fields, body);
  try {
    const user = await UserModel.findByIdAndUpdate(id, editUser, {
      new: true,
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  editUser,
  getUserByEmail,
};
