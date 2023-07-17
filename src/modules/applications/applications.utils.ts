import { IApplication } from "@/types";
import { v4 as uuidv4 } from "uuid";

export const formatApplication = (
  newApplication: IApplication,
  application: IApplication
) => ({
  id: application.id,
  name: newApplication.name || application.name,
  deviceId: newApplication.deviceId || application.deviceId,
  userId: application.userId,
});

export const createdApplication = (body: any, id?: string): IApplication => ({
  id: id || uuidv4().slice(0, 8),
  name: body.name,
  deviceId: body.deviceId,
  userId: body.userId,
});

export const checkEmty = (
  requiredFields: string[],
  application: IApplication
) => {
  let errors: any = {};
  requiredFields.map((field: string) => {
    if (!application[field as keyof IApplication]) {
      return (errors[field] = `${field} cannot empty`);
    }
  });
  return errors;
};
