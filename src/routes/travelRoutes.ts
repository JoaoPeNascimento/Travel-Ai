import { Router } from "express";
import { travelController } from "../controllers/travelController";
import { validateTravelDates } from "../middlewares/validateTravelDates";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/:id", authMiddleware, travelController.getAll);
router.get("/:id", authMiddleware, travelController.getById);
router.delete("/:id", authMiddleware, travelController.deleteTravel);
router.post(
  "/",
  authMiddleware,
  validateTravelDates,
  travelController.createTravel
);
router.put(
  "/:id",
  authMiddleware,
  validateTravelDates,
  travelController.updateTravel
);

export default router;
