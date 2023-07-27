import express from "express";
import users from "./users";
import wallets from "./wallets";
import applications from "./applications";

const router = express.Router();

router.use("/users", users);
router.use("/wallets", wallets);
router.use("/applications", applications);

export default router;
