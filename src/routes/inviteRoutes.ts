import express from "express";
import { inviteController } from "../controllers/inviteController";
import { sendEmailMiddleware } from "../middlewares/sendEmailMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post(
  "/:travelId",
  authMiddleware,
  sendEmailMiddleware,
  inviteController.createInvite
);
router.get("/:travelId", authMiddleware, inviteController.getTravelInvites);
router.get("/", authMiddleware, inviteController.getTravelInvites);

export default router;
