import { Request, Response } from "express";
import { authService } from "../services/authService";
import { AuthenticatedRequest, AuthRequest } from "../types/express";

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

  checkEmail: async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: "E-mail é obrigatório." });
      }

      const { exists, token } = await authService.checkEmail(email);

      return res.status(200).json({ exists, token });
    } catch (error) {
      return res.status(400).json({
        error: "Erro ao verificar e-mail: " + (error as Error).message,
      });
    }
  },

  updateUserData: async (req: AuthRequest, res: Response) => {
    try {
      const { userId } = req;

      if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado." });
      }

      const data = req.body;
      const updatedUser = await authService.updateUserData(userId, data);

      const { password, ...userWithoutPassword } = updatedUser;

      return res.status(200).json(userWithoutPassword);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: "Erro desconhecido ao atualizar usuário" });
    }
  },
};
