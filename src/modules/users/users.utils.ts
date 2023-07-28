export const formatEditUser = (fields: string[], body: any) => {
  let editUser: any = {};
  fields.map((field) => {
    if (body[field]) {
      return (editUser[field] = body[field]);
    }
  });
  return editUser;
};

export const formatCreateUser = (body: any) => ({
  name: body.name,
  email: body.email,
  phone: body.phone || "emptyPhone",
  password: body.password,
  role: "user",
});
