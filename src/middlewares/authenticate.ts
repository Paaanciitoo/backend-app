import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import logger from "../utils/logger";
import { getUserById } from "../models/user";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ message: "No hay registros de una ficha (token)" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: number;
    };
    const user = await getUserById(decoded.userId);
    if (!user) {
      res.status(401).json({ message: "Ficha inválida" });
      return;
    }
    (req as any).user = user;
    next();
  } catch (error) {
    logger.error("Error de autenticación:", error);
    res.status(401).json({ message: "Error de autenticación" });
  }
};
