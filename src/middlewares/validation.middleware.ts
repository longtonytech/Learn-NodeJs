import { NextFunction, Request, Response } from "express";

export const validateMiddleWare = (validator: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = validator(req.body);
    if (error) {
      let errors: string[];
      errors = error.details.map((i: any) => {
        return i.message;
      });
      console.log("error", errors);
      return res.status(400).json({ message: errors });
    }
    next();
  };
};
