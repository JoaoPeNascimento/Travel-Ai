// src/routes/gemini.routes.ts
import { Router } from "express";
import { geminiController } from "../controllers/geminiController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post(
  "/recommendations",
  authMiddleware,
  geminiController.recommendPlaces
);

export default router;
