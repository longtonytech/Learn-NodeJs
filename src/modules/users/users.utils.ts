export const formatEditUser = (body: any) => ({
  name: body.name,
  email: body.email,
  phone: body.phone,
  updatedAt: new Date().toISOString(),
});

export const formatCreateUser = (body: any) => ({
  name: body.name,
  email: body.email,
  phone: body.phone,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
