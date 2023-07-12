import express, { Application } from "express";
import { config } from "dotenv";

config();

const port = process.env.PORT || 9999;

const app: Application = express();

app.use("/", require("./routes"));
module.exports = app;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
