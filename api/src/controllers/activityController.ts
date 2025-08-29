import { Request, Response } from "express";
import { activityService } from "../services/activityService";

export const activityController = {
  getAll: async (req: Request, res: Response) => {
    const travelId = req.params.travelId;
    try {
      const activities = await activityService.getAll(travelId);
      if (activities.length === 0) {
        return res
          .status(200)
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

      res.status(201).json(newActivity);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar a atividade: " + error });
    }
  },

  updateActivity: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, date } = req.body;

    try {
      const updatedActivity = await activityService.updateActivity(id, {
        name,
        description,
        date,
      });

      res.status(200).json(updatedActivity);
    } catch (error) {
      res
        .status(400)
        .json({ error: "Erro ao atualizar a atividade: " + error });
    }
  },

  deleteActivityById: async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const deletedActivity = await activityService.deleteActivityById(id);
      res.status(204);
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar a atividade: " + error });
    }
  },

  deleteAllActivitiesByTravelId: async (req: Request, res: Response) => {
    const travelId = req.params.travelId;
    try {
      const deletedActivities =
        await activityService.deleteAllActivitiesByTravelId(travelId);
      res.status(200).json({
        message: "Atividades deletadas com sucesso",
        deletedCount: deletedActivities.count,
      });
    } catch (error) {
      res.status(404).json({ error: "Atividades não encontradas: " + error });
    }
  },
};
