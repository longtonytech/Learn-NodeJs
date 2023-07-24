export const formatEditApplication = (fields: string[], body: any) => {
  let editApplication: any = {};
  fields.map((field) => {
    if (body[field]) {
      return (editApplication[field] = body[field]);
    }
  });
  return editApplication;
};

export const formatCreateApplication = (body: any) => ({
  userId: body.userId,
  name: body.name,
  deviceId: body.deviceId || "emptyId",
  privateKey: body.privateKey || "emptyKey",
});
