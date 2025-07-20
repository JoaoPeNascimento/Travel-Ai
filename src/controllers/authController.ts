// src/controllers/authController.ts

import { Request, Response } from "express";
import { authService } from "../services/authService";

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ error: "Nome, e-mail e senha são obrigatórios." });
      }

      const token = await authService.register(name, email, password);
      res.status(201).json({ token });
    } catch (error) {
      res.status(400).json({
        error: "Erro ao fazer login. E-mail ou senha inválidos:" + error,
      });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "E-mail e senha são obrigatórios." });
      }

      const token = await authService.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({
        error: "Erro ao fazer login. E-mail ou senha inválidos:" + error,
      });
    }
  },
};
