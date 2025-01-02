import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().max(20).min(2),
  email: z.string().email({ message: "Must be an email" }),
  password: z
    .string()
    .min(6)
    .regex(/[A-Z]/, "La contraseña debe incluir al menos una letra mayúscula.")
    .regex(/[a-z]/, "La contraseña debe incluir al menos una letra minúscula.")
    .regex(/[0-9]/, "La contraseña debe incluir al menos un número.")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "La contraseña debe incluir al menos un carácter especial."
    ),
});
