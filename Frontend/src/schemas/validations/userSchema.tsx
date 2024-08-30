import { z } from "zod";

export const userSchema = z.object({
  // Validate name
  name: z.string().min(1, "El nombre es requerido."),

  // Validate name
  surname: z.string().min(1, "El apellido es requerido."),

  // Validate email
  email: z.string({ required_error: "El email es requerido." }).email({
    message: "Ingrese un email valido, ejm: user@gmail.com",
  }),

  // Validate password
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "La contraseña debe contener minusculas, mayusculas, numero y simbolos"
    ),

  // Validate conditions and terms
  terms: z.boolean().refine((value) => value === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
});

export const updateUserSchema = z.object({
  // Validate name
  name: z.string().min(1, "El nombre es requerido."),

  // Validate name
  surname: z.string().min(1, "El apellido es requerido."),

  // Validate phone
  phone: z
    .string()
    .regex(/^(?:\d+|)$/, "El telefono solo puedo contener numeros"),
});

export const changeDirection = z.object({
  // Validate
  province: z.string().min(1, "La provincia es requerida"),
  // Validate country
  country: z.string().min(1, "El país es requerido "),
  // Validate direction
  direction: z.string().min(1, "La dirección es requerida"),
  // Validate more info
  info: z.string().min(1, "El nro Casa, apartamento, suite, etc. es requerido"),
});

export const changePassword = z.object({
  // Validate actual password
  password: z
    .string()
    .min(1, "Para cambiar la contraseña debes introducir la actual"),
  // Validate new password
  newPassword: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "La contraseña debe contener minusculas, mayusculas, numero y simbolos"
    ),
});
