export const UserModel = {
  id: {
    type: "string",
  },
  name: {
    type: "string",
  },
  email: {
    type: "string",
  },
  phone: {
    type: "string",
  },
  createdAt: {
    type: "string",
  },
  updatedAt: {
    type: "string",
  },
};
export const requiredUsersFields: string[] = ["email", "name"];
