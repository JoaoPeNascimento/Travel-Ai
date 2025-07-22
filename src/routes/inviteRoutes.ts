import express from "express";
import { inviteController } from "../controllers/inviteController";
import { sendEmailMiddleware } from "../middlewares/sendEmailMiddleware";

const router = express.Router();

router.post("/", sendEmailMiddleware, inviteController.createInvite);
router.get("/:travelId", inviteController.getTravelInvites);

export default router;
