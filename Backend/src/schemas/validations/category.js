import { z } from "zod";

const CategorySchema = z.object({
  // Validate category name
  name: z.string({
    invalid_type_error: "Name must be a string",
    required_error: "Name is required.",
  }),
});

export function validateCategory(input) {
  return CategorySchema.safeParse(input);
}

export function validatePartialCategory(input) {
  return CategorySchema.partial().safeParse(input);
}
