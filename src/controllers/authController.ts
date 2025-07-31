import { Request, Response } from "express";
import { authService } from "../services/authService";
import { AuthenticatedRequest } from "types/express";

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ error: "Nome, e-mail e senha são obrigatórios." });
      }

      const { token, userId } = await authService.register(
        name,
        email,
        password
      );
      res.status(201).json({ token, userId });
    } catch (error) {
      res.status(400).json({
        error: "Erro ao registrar. " + (error as Error).message,
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

      const { token, userId } = await authService.login(email, password);
      res.status(200).json({ token, userId });
    } catch (error) {
      res.status(400).json({
        error: "Erro ao fazer login. " + (error as Error).message,
      });
    }
  },

  getUser: async (req: Request, res: Response) => {
    const { userId } = req as AuthenticatedRequest;

    try {
      const { userData } = await authService.getUser(userId);
      return res.status(200).json({ userData });
    } catch (error) {
      return res.status(400).json({
        error: "Erro ao buscar usuário: " + (error as Error).message,
      });
    }
  },
};
