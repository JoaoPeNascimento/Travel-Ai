import { Router } from "express";
import { activityController } from "../controllers/activityController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/:travelId", authMiddleware, activityController.getAll);
router.post("/", authMiddleware, activityController.createActivity);
router.delete("/:id", authMiddleware, activityController.deleteActivityById);

export default router;
