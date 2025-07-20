import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token";

interface AuthRequest extends Request {
  userId?: string;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ error: "Token não fornecido." });

  const [, token] = authHeader.split(" ");

  try {
    const payload = verifyToken(token);
    req.userId = payload.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido." + error });
  }
}
