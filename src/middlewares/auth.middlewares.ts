import { NextFunction, Request, Response } from "express";
import { secretKey } from "@/modules/auth/auth.config";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).send({ message: "No token provided!" });
  }
  const [, token] = authHeader.split(" ");
  jwt.verify(token, secretKey!, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    next();
  });
};
