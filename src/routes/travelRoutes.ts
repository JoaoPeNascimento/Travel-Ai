import { Router } from "express";
import { travelController } from "../controllers/travelController";

const router = Router();

router.get("/", travelController.getAll);
router.get("/:id", travelController.getById);
router.delete("/:id", travelController.deleteTravel);
router.post("/", travelController.createTravel);

export default router;
