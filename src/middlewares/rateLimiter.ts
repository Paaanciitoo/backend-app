import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message:
    "Demasiados intentos de inicio de sesión, por favor intente de nuevo más tarde",
  standardHeaders: true,
  legacyHeaders: false,
});
