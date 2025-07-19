import { Router } from "express";
import { activityController } from "../controllers/activityController";

const router = Router();

router.get("/:travelId", activityController.getAll);
router.post("/", activityController.createActivity);
router.delete("/:id", activityController.deleteActivityById);

export default router;
