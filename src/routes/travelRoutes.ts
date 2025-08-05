import { Router } from "express";
import { travelController } from "../controllers/travelController";
import { validateOptionalTravelDates } from "../middlewares/validateTravelDates";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, travelController.getAll);
router.get("/:id", authMiddleware, travelController.getById);
router.post(
  "/",
  authMiddleware,
  validateOptionalTravelDates,
  travelController.createTravel
);
router.delete("/:travelId", authMiddleware, travelController.deleteTravel);
router.put(
  "/:travelId",
  authMiddleware,
  validateOptionalTravelDates,
  travelController.updateTravel
);

export default router;
