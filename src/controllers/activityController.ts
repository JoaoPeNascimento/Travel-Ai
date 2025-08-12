import { Request, Response } from "express";
import { activityService } from "../services/activityService";

export const activityController = {
  getAll: async (req: Request, res: Response) => {
    const travelId = req.params.travelId;
    try {
      const activities = await activityService.getAll(travelId);

      if (activities.length === 0) {
        return res
          .status(400)
          .json({ error: "Não há atividades para esta viagem!" });
      }
      res.status(200).json(activities);
    } catch (error) {
      res.status(500).end("Erro ao buscar as atividades: " + error);
    }
  },

  createActivity: async (req: Request, res: Response) => {
    const { name, description, date } = req.body;
    const { travelId } = req.params;
    try {
      const newActivity = await activityService.createActivity({
        name,
        description,
        date,
        travelId,
      });

      if (!newActivity) {
        return res
          .status(400)
          .json({ error: "Não foi possível criar a viagem." });
      }
      res.status(201).json(newActivity);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar a atividade: " + error });
    }
  },

  deleteActivityById: async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const deletedActivity = await activityService.deleteActivityById(id);
      res.status(200).json(deletedActivity);
    } catch (error) {
      res.status(404).json({ error: "Atividade não encontrada: " + error });
    }
  },

  deleteAllActivitiesByTravelId: async (req: Request, res: Response) => {
    const travelId = req.params.travelId;
    try {
      const deletedActivities =
        await activityService.deleteAllActivitiesByTravelId(travelId);
      res.status(200).send("Atividades deletadas").json(deletedActivities);
    } catch (error) {
      res.status(404).json({ error: "Atividades não encontrada: " + error });
    }
  },
};
