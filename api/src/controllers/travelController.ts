import { Request, Response } from "express";
import { travelService } from "../services/travelService";
import { activityService } from "../services/activityService";
import { inviteService } from "../services/inviteService";
import { AuthenticatedRequest } from "../types/express";

export const travelController = {
  getAll: async (req: Request, res: Response) => {
    const { userId } = req as AuthenticatedRequest;

    try {
      const travels = await travelService.getAll(userId);
      if (travels.length === 0) {
        return res.send("Nenhuma viagem cadastrada");
      }
      res.status(200).json(travels);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar viagens: " + error });
    }
  },

  getById: async (req: Request, res: Response) => {
    const travelId = req.params.travelId;

    try {
      const travel = await travelService.getById(travelId);
      res.status(200).json(travel);
    } catch (error) {
      res.status(404).json({ error: "Viagem não encontrada: " + error });
    }
  },

  createTravel: async (req: Request, res: Response) => {
    const { destination, startDate, endDate } = req.body;

    const { userId } = req as AuthenticatedRequest;

    try {
      const newTravel = await travelService.createTravel({
        destination,
        startDate,
        endDate,
        ownerId: userId,
      });

      if (!newTravel) {
        return res
          .status(400)
          .json({ error: "Não foi possível criar a viagem." });
      }
      res.status(201).json(newTravel);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar viagem: " + error });
    }
  },

  deleteTravel: async (req: Request, res: Response) => {
    const travelId = req.params.travelId;

    const { userId } = req as AuthenticatedRequest;

    try {
      await activityService.deleteAllActivitiesByTravelId(travelId);
      await inviteService.deleteInvitesByTravelId(travelId);
      await travelService.deleteTravel(travelId, userId);
      res.status(204).end();
    } catch (error) {
      res.status(404).json({ Error: "" + error });
    }
  },

  updateTravel: async (req: Request, res: Response) => {
    const travelId = req.params.travelId;

    const { userId } = req as AuthenticatedRequest;

    const { destination, startDate, endDate } = req.body;
    try {
      const updatedTravel = await travelService.updateTravel(travelId, userId, {
        destination,
        startDate,
        endDate,
      });
      res.status(200).json(updatedTravel);
    } catch (error) {
      res.status(404).json({ Error: "" + error });
    }
  },
};
