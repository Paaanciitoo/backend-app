import nodemailer from "nodemailer";
import dotenv from "dotenv";
import logger from "../utils/logger";

dotenv.config();

export async function sendPasswordResetEmail(
  email: string,
  token: string
): Promise<boolean> {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Restablecer contraseña",
    text: `Ha solicitado que se restablezca su contraseña. Haga clic en el enlace para restablecer su contraseña: http://localhost:3000/reset-password?token=${token}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    logger.error(
      "Error al enviar el correo electrónico de restablecimiento de contraseña:",
      error
    );
    return false;
  }
}
