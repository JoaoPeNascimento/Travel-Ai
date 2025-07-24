// src/routes/gemini.routes.ts
import { Router } from "express";
import { geminiController } from "../controllers/geminiController";

const router = Router();

router.post("/recommendations", geminiController.recommendPlaces);

export default router;
