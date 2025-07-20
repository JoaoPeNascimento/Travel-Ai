import { Router } from "express";
import { travelController } from "../controllers/travelController";
import { validateTravelDates } from "../middlewares/validateTravelDates";

const router = Router();

router.get("/", travelController.getAll);
router.get("/:id", travelController.getById);
router.delete("/:id", travelController.deleteTravel);
router.post("/", validateTravelDates, travelController.createTravel);

export default router;
