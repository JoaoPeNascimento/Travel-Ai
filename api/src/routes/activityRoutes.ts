import { Router } from "express";
import { activityController } from "../controllers/activityController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/:travelId", authMiddleware, activityController.getAll);
router.post("/:travelId", authMiddleware, activityController.createActivity);
router.put("/:id", authMiddleware, activityController.updateActivity);
router.delete("/:id", authMiddleware, activityController.deleteActivityById);

export default router;
