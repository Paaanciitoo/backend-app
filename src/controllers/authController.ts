import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
} from "../utils/validators";
import logger from "../utils/logger";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const { email, password } = req.body;
    const user = await authService.registerUser(email, password);
    res
      .status(201)
      .json({ message: "Usuario registrado con éxito", userId: user.id });
  } catch (error) {
    logger.error("Error al registrar el usuario:", error);
    res.status(500).json({
      message: "Error al registrar el usuario",
      error: (error as Error).message,
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const { email, password } = req.body;
    const { token, user } = await authService.loginUser(email, password);
    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    logger.error("Error al iniciar sesión:", error);
    res.status(500).json({
      message: "Error al iniciar sesión",
      error: (error as Error).message,
    });
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { error } = forgotPasswordSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const { email } = req.body;
    await authService.forgotPassword(email);
    res.status(200).json({
      message: "Un link se ha enviado a tu correo para reiniciar tu contraseña",
    });
  } catch (error) {
    logger.error(
      "Error al procesar la petición para la recuperación de tu contraseña:",
      error
    );
    res.status(500).json({
      message:
        "Error al procesar la petición para la recuperación de tu contraseña",
      error: (error as Error).message,
    });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { token, newPassword } = req.body;
    await authService.resetPassword(token, newPassword);
    res.json({ message: "La contraseña de ha reiniciado correctamente" });
  } catch (error) {
    logger.error("Error al intentar reiniciar tu contraseña:", error);
    res.status(400).json({
      message: "Error al intentar reiniciar tu contraseña",
      error: (error as Error).message,
    });
  }
};

export const setupTwoFactor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const { secret, qrCodeDataUrl } = await authService.setupTwoFactor(userId);
    res.json({ secret, qrCodeDataUrl });
  } catch (error) {
    logger.error("Error al configurar el 2FA:", error);
    if (!res.headersSent) {
      res.status(500).json({
        message: "Error al configurar el 2FA",
        error: (error as Error).message,
      });
    } else {
      next(error);
    }
  }
};
