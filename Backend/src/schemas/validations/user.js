import { z } from "zod";

const userSchema = z.object({
  // Validate person name
  name: z.string({
    invalid_type_error: "Name must be a string",
    required_error: "Name is required.",
  }),

  // Validate person surname
  surname: z.string({
    invalid_type_error: "Surname must be a string",
    required_error: "Surname is required.",
  }),

  // Validate email
  email: z.string({ required_error: "Email is required." }).email({
    invalid_type_error: "Email must be a valid email, ejm: user@gmail.com",
  }),

  // Validate password
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password cannot be more than 20 characters")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "The password must contain at least one lowercase letter, one uppercase letter, and one number"
    ),

  // Validate role id
  role_id: z.number().int().positive(),
});

const updateUserSchema = z.object({
  // Validate person name
  name: z.string({
    invalid_type_error: "Name must be a string",
    required_error: "Name is required.",
  }),

  // Validate person surname
  surname: z.string({
    invalid_type_error: "Surname must be a string",
    required_error: "Surname is required.",
  }),

  // Validate email
  email: z.string({ required_error: "Email is required." }).email({
    invalid_type_error: "Email must be a valid email, ejm: user@gmail.com",
  }),

  // Validate email
  phone: z.string().nullable(),

  // Validate email
  direction: z.string().nullable(),

  // Validate password
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password cannot be more than 20 characters")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "The password must contain at least one lowercase letter, one uppercase letter, and one number"
    ),

  // Validate role id
  role_id: z.number().int().positive(),
});

export function validateUser(input) {
  return userSchema.safeParse(input);
}

export function validatePartialUser(input) {
  return updateUserSchema.partial().safeParse(input);
}
