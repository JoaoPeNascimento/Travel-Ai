import { Request, Response, NextFunction } from "express";
import { sendInviteEmail } from "../services/emailService";
import { generateInviteEmail } from "../utils/emailTemplate";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const sendEmailMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { travelId, recieverEmail } = req.body;

  try {
    const travel = await prisma.travel.findUnique({ where: { id: travelId } });

    if (!travel) {
      return res.status(404).json({ error: "Viagem não encontrada." });
    }

    const html = generateInviteEmail(
      travel.destination,
      `https://www.youtube.com/`
    );

    await sendInviteEmail(recieverEmail, "Convite para uma viagem", html);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro ao enviar o convite por email." + error });
  }

  next();
};
