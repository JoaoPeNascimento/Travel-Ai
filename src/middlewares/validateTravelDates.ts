import { Request, Response, NextFunction } from "express";

export function validateTravelDates(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { startDate, endDate } = req.body;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const currentDate = new Date();

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return res.status(400).json({ error: "Datas inválidas." });
  }

  if (start >= end) {
    return res.status(400).json({
      error: "A data de início deve ser anterior à data de término.",
    });
  }

  if (start < currentDate) {
    return res.status(400).json({
      error: "A data de início não pode ser anterior à data atual.",
    });
  }

  if (end < currentDate) {
    return res.status(400).json({
      error: "A data de término não pode ser anterior à data atual.",
    });
  }

  next();
}
