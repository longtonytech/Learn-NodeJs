import fs from "fs";
import { Response } from "express";

export const readData = (res: any) => {
  fs.readFile("db.json", (error, data) => {
    if (error) {
      console.error(error);
      throw error;
    }
    res = JSON.parse(data.toString());
  });
};

export const writeData = (data: string, res: Response, obj: any) => {
  fs.writeFile("db.json", data, "utf8", (err) => {
    if (err) {
      console.log(`Error writing file: ${err}`);
      res.status(500).json({
        message: err.message,
      });
    } else {
      console.log(`File is written successfully!`);
      res.json(obj);
    }
  });
};
