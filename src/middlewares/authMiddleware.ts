import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token";
import { AuthRequest } from "../types/express";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  const [, token] = authHeader.split(" ");

  try {
    const payload = verifyToken(token);

    // Cast para AuthRequest para setar userId
    (req as AuthRequest).userId = payload.userId;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido. " + error });
  }
}
