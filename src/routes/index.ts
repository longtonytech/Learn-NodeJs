import express from "express";
import users from "@/routes/users";
import wallets from "@/routes/wallets";
import applications from "@/routes/applications";
import auth from "@/routes/auth";

const router = express.Router();

router.use("/users", users);
router.use("/wallets", wallets);
router.use("/applications", applications);
router.use("/auth", auth);

export default router;
