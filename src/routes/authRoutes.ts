import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  setupTwoFactor,
} from "../controllers/authController";
import { loginLimiter } from "../middlewares/rateLimiter";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: El usuario ha sido registrado exitosamente
 *       400:
 *         description: Entrada inválida
 *       500:
 *         description: Error en el servidor
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Realiza el inicio de sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Entrada inválida
 *       401:
 *         description: Error en el servidor, credenciales inválidas
 */
router.post("/login", loginLimiter, login);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Solicitar restablecimiento de contraseña
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Un link se ha enviado a tu correo para reiniciar tu contraseña
 *       400:
 *         description: Entrada inválida
 *       500:
 *         description: Error en el servidor
 */
router.post("/forgot-password", forgotPassword);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Restablecer la contraseña
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: La contraseña se ha reiniciado correctamente
 *       400:
 *         description: Entrada inválida
 *       500:
 *         description: Error en el servidor
 */
router.post("/reset-password", resetPassword);

/**
 * @swagger
 * /api/auth/setup-2fa:
 *   post:
 *     summary: Configurar autenticación de dos factores
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Autenticación de dos factores configurada correctamente
 *       400:
 *         description: Entrada inválida
 *       500:
 *         description: Error en el servidor
 */
router.post("/setup-2fa", authenticate, setupTwoFactor);

/**
 * @swagger
 * /api/protected:
 *   get:
 *     summary: Obtener recurso protegido
 *     tags: [Protected]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recurso protegido obtenido exitosamente
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error en el servidor
 */
router.get("/protected", authenticate, (req, res) => {
  res.json({ message: "Recurso protegido obtenido exitosamente" });
});

export default router;
