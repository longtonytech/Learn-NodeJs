import express from "express";
import users from "./users";
import wallets from "./wallets";
import applications from "./applications";
import applicationWallets from "./wallets-applications";

const router = express.Router();

router.use("/users", users);
router.use("/wallets", wallets);
router.use("/applications", applications);
router.use("/application-wallets", applicationWallets);

export default router;
