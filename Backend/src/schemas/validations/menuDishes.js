import { z } from "zod";

const MenuDishesSchema = z.object({
  // Validate user_id
  user_id: z
    .number({
      integer: true,
      required_error: "User is required.",
    })
    .positive(),

  // Validate dish_id
  dish_id: z
    .number({
      integer: true,
      required_error: "Dish is required.",
    })
    .positive(),

  // Validate dish_status_id
  dish_status_id: z
    .number({
      integer: true,
      required_error: "Dish Status is required.",
    })
    .positive(),
});

export function validateMenuDishes(input) {
  return MenuDishesSchema.safeParse(input);
}

export function validatePartialMenuDishes(input) {
  return MenuDishesSchema.partial().safeParse(input);
}
