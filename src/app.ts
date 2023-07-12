import "module-alias/register";

import express, { Application } from "express";
import { config } from "dotenv";

import routers from "./routes";

config();

const port = process.env.PORT || 9999;

const app: Application = express();

app.use("/", routers);

module.exports = app;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
