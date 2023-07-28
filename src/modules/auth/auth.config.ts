import { config } from "dotenv";
config();
export const secretKey = process.env.ACCESS_TOKEN_SECRET;
