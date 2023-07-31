import { IRequestType } from "@/types";
import { Request } from "express";

export const formatEditApplication = (fields: string[], body: any) => {
  let editApplication: any = {};
  fields.map((field) => {
    if (body[field]) {
      return (editApplication[field] = body[field]);
    }
  });
  return editApplication;
};

export const formatCreateApplication = (req: Request & IRequestType) => ({
  userId: req.userId,
  name: req.body.name,
  deviceId: req.body.deviceId || "emptyId",
  privateKey: req.body.privateKey || "emptyKey",
});
