import { z } from "zod";

const DishSchema = z.object({
  // Validate name
  name: z.string().min(1, { message: "The dish name is required" }).max(255),

  // Validate category_id
  category_id: z.number().min(1, { message: "The dish category is required" }),

  // Validate price
  price: z.number().positive({ message: "The dish price must be positive" }),

  // Validate weight
  weight: z.number().positive({ message: "The dish weight must be positive" }),

  // Validate calories
  calories: z
    .number()
    .min(0, { message: "The dish calories cannot be negative" }),

  // Validate proteins
  proteins: z
    .number()
    .min(0, { message: "The dish proteins cannot be negative" }),

  // Validate carbohydrates
  carbohydrates: z
    .number()
    .min(0, { message: "The dish carbohydrates cannot be negative" }),

  // Validate fats
  fats: z.number().min(0, { message: "The dish fats cannot be negative" }),

  // Validate saturated_fats
  saturated_fats: z
    .number()
    .min(0, { message: "The dish saturated fats cannot be negative" }),

  // Validate sugars
  sugars: z.number().min(0, { message: "The dish sugars cannot be negative" }),

  // Validate dietary_fiber
  dietary_fiber: z
    .number()
    .min(0, { message: "The dish dietary fiber cannot be negative" }),

  // Validate description
  description: z.string().max(1000),

  // Validate image
  image: z.string().url({ message: "The dish image must be a valid URL" }),
});

export function validateDish(input) {
  return DishSchema.safeParse(input);
}

export function validatePartialDish(input) {
  return DishSchema.partial().safeParse(input);
}
