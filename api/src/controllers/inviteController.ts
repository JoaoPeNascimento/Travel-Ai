import { Request, Response } from "express";
import { inviteService } from "../services/inviteService";
import { AuthenticatedRequest } from "../types/express";

export const inviteController = {
  createInvite: async (req: Request, res: Response) => {
    const { recieverEmail, travelId } = req.body;
    try {
      const invite = await inviteService.createInvite(travelId, recieverEmail);
      return res
        .status(201)
        .json({ message: "Convite criado e e-mail enviado.", invite });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao criar o convite." + error });
    }
  },

  getUserInvites: async (req: Request, res: Response) => {
    const { userId } = req as AuthenticatedRequest;

    try {
      const invites = await inviteService.getInvitesByTravel(userId);
      return res.status(200).json(invites);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao buscar os convites." + error });
    }
  },

  getTravelInvites: async (req: Request, res: Response) => {
    const { travelId } = req.params;
    try {
      const invites = await inviteService.getInvitesByTravel(travelId);
      return res.status(200).json(invites);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao buscar os convites." + error });
    }
  },
};
