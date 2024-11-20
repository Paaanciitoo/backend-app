import speakeasy from "speakeasy";
import qrcode from "qrcode";
import logger from "../utils/logger";

export async function generateTwoFactorSecret() {
  const secret = speakeasy.generateSecret({ name: "Your App" });

  const otpauthUrl = speakeasy.otpauthURL({
    secret: secret.ascii,
    label: "Su aplicación",
    issuer: "Su empresa",
  });

  const qrCodeDataUrl = await qrcode.toDataURL(otpauthUrl);

  logger.info("Secreto 2FA generado");
  return { secret: secret.base32, qrCodeDataUrl };
}

export function verifyTwoFactorToken(secret: string, token: string) {
  const isValid = speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token,
  });
  logger.info(`Resultado de la verificación del token 2FA: ${isValid}`);
  return isValid;
}
