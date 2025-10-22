import { Router } from "express";
import { login, logout, signup, verifyAuth } from "../controllers/user.controller.js";
import verifyToken from "../middlewares/verifyToken.middleware.js";
const router = Router();

router.post("/sign-up", signup);
router.post("/login", login);
router.post("/verify-auth", verifyToken,verifyAuth);
router.get("/logout", logout);

export default router;
