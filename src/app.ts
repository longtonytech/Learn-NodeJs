import "module-alias/register";
import express, { Application, Request, Response } from "express";
import { config } from "dotenv";
import routers from "./routes";
config();
import mongoose from "mongoose";
const data = process.env.DATABASE;
mongoose.connect(data!).catch((error) => console.log(error));

const port = process.env.PORT || 9999;

const app: Application = express();

const name = process.env.MYNAME || "Kun";
app.use(express.json());
app.use("/", routers);
app.get("/", (_req: Request, res: Response) => {
  res.send("Hello " + name);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
export default app;
