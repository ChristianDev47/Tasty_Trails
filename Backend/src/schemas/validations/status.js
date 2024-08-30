import { z } from "zod";

const statusSchema = z.object({
  // Validate name
  name: z.string({
    invalid_type_error: "Name must be a string",
    required_error: "Name is required.",
  }),
});

export function validateStatus(input) {
  return statusSchema.safeParse(input);
}

export function validatePartialStatus(input) {
  return statusSchema.partial().safeParse(input);
}
