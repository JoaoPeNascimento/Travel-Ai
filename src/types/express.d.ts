import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  userId: string;
}

export interface AuthRequest extends Request {
  userId?: string;
}
