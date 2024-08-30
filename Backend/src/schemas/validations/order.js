import { z } from "zod";

const orderSchema = z.object({
  // Validate user_id
  user_id: z
    .number({
      integer: true,
      required_error: "User_id is required.",
    })
    .positive(),

  // Validate order status
  order_status_id: z
    .number({
      integer: true,
      required_error: "status_id is required.",
    })
    .positive(),

  // Validate direction
  direction: z.string().max(1000),

  // Validate phone
  phone: z.string().max(1000),

  // Validate total
  total: z.number({
    required_error: "total is required.",
  }),

  // Validate dishes
  dishes: z.array(
    z.object({
      dish_id: z.number(),
      count: z.number(),
    })
  ),
});

export function validateOrder(input) {
  return orderSchema.safeParse(input);
}

export function validatePartialOrder(input) {
  return orderSchema.partial().safeParse(input);
}
