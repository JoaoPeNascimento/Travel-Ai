import { Router } from "express";
import { travelController } from "../controllers/travelController";
import { validateOptionalTravelDates } from "../middlewares/validateTravelDates";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/:id", authMiddleware, travelController.getAll);
router.get("/:id", authMiddleware, travelController.getById);
router.delete("/:id", authMiddleware, travelController.deleteTravel);
router.post(
  "/",
  authMiddleware,
  validateOptionalTravelDates,
  travelController.createTravel
);
router.put(
  "/:id",
  authMiddleware,
  validateOptionalTravelDates,
  travelController.updateTravel
);

export default router;
