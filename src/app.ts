import { v4 as uuidv4 } from "uuid";
import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { IUser } from "./types";

import { readData, writeData } from "./ultils";
config();
let response: {
  users?: IUser[];
} = {};
const port = process.env.PORT || 9999;
const name = process.env.MYNAME || "Kun";
readData(response);

const app: Application = express();
var jsonParser = bodyParser.json();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello " + name);
});
app.get("/users", (req: Request, res: Response) => {
  const { users } = response;
  if (users) {
    res.json(users);
  } else {
    res.status(404).json("Sorry, cant find that");
  }
});

app.get("/users/:id", (req: Request, res: Response) => {
  const { users } = response;
  const user = users?.find((user) => user.id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json("Sorry, cant find user");
  }
});

app.post("/users", jsonParser, (req: Request, res: Response) => {
  let user = {
    id: uuidv4().slice(0, 8),
    name: req.body.name,
  };
  const { users } = response;
  users?.push(user);
  const newData = JSON.stringify({ ...response, users });
  writeData(newData, res, user);
});

app.delete("/users/:id", (req: Request, res: Response) => {
  let { users } = response;
  const deleteUser = users?.find((user) => user.id === req.params.id);
  if (deleteUser) {
    users = users?.filter((user) => user.id !== req.params.id);
    const newData = JSON.stringify({ ...response, users });
    writeData(newData, res, deleteUser);
  } else {
    res.status(400).json({
      message: "User not found",
    });
  }
});

app.put("/users/:id", jsonParser, (req: Request, res: Response) => {
  const { users } = response;
  let editUser = users?.find((user) => user.id === req.params.id);
  if (editUser) {
    const newUsers = users?.map((user) => {
      if (user.id === req.params.id) {
        editUser = { id: req.params.id, ...req.body };
        return editUser;
      } else {
        return user;
      }
    });
    const newData = JSON.stringify({ ...response, newUsers });
    writeData(newData, res, editUser);
  } else {
    res.status(400).json({
      message: "User not found",
    });
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
