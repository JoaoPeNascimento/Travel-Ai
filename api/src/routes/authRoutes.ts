import { Router } from "express";
import { authController } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/user", authMiddleware, authController.getUser);
router.post("/check-email", authController.checkEmail);
router.put("/update", authMiddleware, authController.updateUserData);

export default router;
