import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "El correo electrónico debe ser válido",
    "string.empty": "El correo electrónico no puede estar vacío",
    "any.required": "El correo electrónico es obligatorio",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "La contraseña debe tener al menos 6 caracteres",
    "string.empty": "La contraseña no puede estar vacía",
    "any.required": "La contraseña es obligatoria",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "El correo electrónico debe ser válido",
    "string.empty": "El correo electrónico no puede estar vacío",
    "any.required": "El correo electrónico es obligatorio",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "La contraseña debe tener al menos 6 caracteres",
    "string.empty": "La contraseña no puede estar vacía",
    "any.required": "La contraseña es obligatoria",
  }),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "El correo electrónico debe ser válido",
    "string.empty": "El correo electrónico no puede estar vacío",
    "any.required": "El correo electrónico es obligatorio",
  }),
});
