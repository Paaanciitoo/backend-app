import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { getUserByEmail, createUser, updateUser } from "../models/user";
import { generateTwoFactorSecret } from "./twoFactorService";
import { sendPasswordResetEmail } from "../services/emailService";
import logger from "../utils/logger";

const prisma = new PrismaClient();

export async function registerUser(email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser(email, hashedPassword);
  logger.info(`Usuario registrado: ${user.id}`);
  return user;
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Credenciales inválidas");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Credenciales inválidas");
  }
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  await prisma.user.update({
    where: { id: user.id },
    data: { token },
  });

  logger.info(`Usuario conectado: ${user.id}`);
  return { token, user };
}

export async function setupTwoFactor(userId: number) {
  const { secret, qrCodeDataUrl } = await generateTwoFactorSecret();
  await updateUser(userId, { twoFactorSecret: secret, twoFactorEnabled: true });
  logger.info(`2FA configurado para el usuario: ${userId}`);
  return { secret, qrCodeDataUrl };
}

export async function forgotPassword(email: string) {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  const resetToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );
  await sendPasswordResetEmail(email, resetToken);
  logger.info(
    `Solicitud de restablecimiento de contraseña para el usuario: ${user.id}`
  );
}

export async function resetPassword(token: string, newPassword: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: number;
    };
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await updateUser(decoded.userId, { password: hashedPassword });
    logger.info(
      `Restablecimiento de la contraseña del usuario: ${decoded.userId}`
    );
  } catch (error) {
    logger.error("Error al restablecer la contraseña:", error);
    throw new Error("Token no válido o caducado");
  }
}

export async function generateToken(userId: number) {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
}
