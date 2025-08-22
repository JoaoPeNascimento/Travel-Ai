import { Request, Response, NextFunction } from "express";

export function validateOptionalTravelDates(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { startDate, endDate } = req.body;

  // Se nenhum dos dois campos for enviado, simplesmente continua
  if (!startDate && !endDate) {
    return next();
  }

  // Se só um dos campos for enviado, isso é considerado um erro
  if ((startDate && !endDate) || (!startDate && endDate)) {
    return res.status(400).json({
      error: "Ambas as datas devem ser fornecidas para validação.",
    });
  }

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
