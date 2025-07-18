import { Request, Response } from "express";
import { travelService } from "../services/travelService";

export const travelController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const travels = await travelService.getAll();
      if (travels.length === 0) {
        return res.send("Nenhuma viagem cadastrada");
      }
      res.status(200).json(travels);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar viagens: " + error });
    }
  },

  getById: async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const travel = await travelService.getById(id);
      res.status(200).json(travel);
    } catch (error) {
      res.status(404).json({ error: "Viagem não encontrada: " + error });
    }
  },

  createTravel: async (req: Request, res: Response) => {
    const { destination, date, ownerId } = req.body;
    try {
      const newTravel = await travelService.createTravel({
        destination,
        date,
        ownerId,
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
    const id = req.params.id;
    try {
      const deletedTravel = await travelService.deleteTravel(id);
      res.status(200).json(deletedTravel);
    } catch (error) {
      res.status(404).json({ error: "Viagem não encontrada: " + error });
    }
  },
};
