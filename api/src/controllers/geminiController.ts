// src/controllers/gemini.controller.ts
import { Request, Response } from "express";
import { geminiService } from "../services/geminiService";

export const geminiController = {
  recommendPlaces: async (req: Request, res: Response) => {
    const { destination, startDate, endDate } = req.body;

    if (!destination || !startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Destino e data são obrigatórios." });
    }

    try {
      const recommendations = await geminiService.getRecommendations(
        destination,
        startDate,
        endDate,
      );
      return res.status(200).json(recommendations);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao gerar recomendações com IA." + error });
    }
  },
};
