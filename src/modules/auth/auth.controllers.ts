import { Request, Response } from "express";
import UsersServices from "../users/users.services";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { secretKey } from "@/modules/auth/auth.config";

const login = async (req: Request, res: Response) => {
  const email = req.body.email || "test";
  const password = req.body.password || "12345";

  const user = await UsersServices.getUserByEmail(email);
  if (!user) {
    return res.status(401).json("Email not found");
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password as string);
  if (!isPasswordValid) {
    return res.status(401).json("Invalid Password!");
  }

  var token = jwt.sign({ userId: user.id }, secretKey!, {
    expiresIn: 86400, // 24 hours
  });

  res.status(200).json({
    userId: user.id,
    accessToken: token,
  });
};
export default { login };
