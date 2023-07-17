import { IUser } from "@/types";
import { v4 as uuidv4 } from "uuid";

export const formatUser = (newUser: IUser, user: IUser) => ({
  id: user.id,
  name: newUser.name || user.name,
  email: newUser.email || user.email,
  phone: newUser.phone || user.phone,
  createdAt: newUser.createdAt || user.createdAt,
  updatedAt: new Date().toISOString(),
});

export const createdUser = (body: any, id?: string): IUser => ({
  id: id || uuidv4().slice(0, 8),
  name: body.name,
  email: body.email,
  phone: body.phone,
  createdAt: id ? body.createdAt : new Date().toISOString(),
});

export const checkEmty = (requiredFields: string[], user: IUser) => {
  let errors: any = {};
  requiredFields.filter((field: string) => {
    if (!user[field as keyof IUser]) {
      return (errors[field] = `${field} cannot empty`);
    }
  });
  return errors;
};
