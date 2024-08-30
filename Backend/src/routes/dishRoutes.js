import { Router } from "express";
import DishController from "../controllers/dish.js";
import upload from "../services/images.js";

function DishRouter({ dishModel }) {
  const dishesRouter = Router();
  const dishController = new DishController({ dishModel });

  // DOCUMENTATION
  /**
   * @openapi
   * paths:
   *   /api/dishes:
   *     get:
   *       summary: Get all dishes
   *       tags: [Dishes]
   *       description: Retrieve a list of all available dishes.
   *       responses:
   *         '200':
   *           description: A list of dishes
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/Dish'
   *         '404':
   *           description: Error getting dishes
   *     post:
   *       summary: Create a dish
   *       tags: [Dishes]
   *       description: Create a new dish.
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *                type: object
   *                properties:
   *                  name:
   *                    type: string
   *                  category_id:
   *                    type: integer
   *                    example: 1
   *                  price:
   *                    type: number
   *                    format: double
   *                    maximumFractionDigits: 2
   *                    example: 1.99
   *                  weight:
   *                    type: number
   *                    format: double
   *                    maximumFractionDigits: 2
   *                    example: 1.99
   *                  calories:
   *                    type: number
   *                    format: double
   *                    maximumFractionDigits: 2
   *                    example: 1.99
   *                  proteins:
   *                    type: number
   *                    format: double
   *                    maximumFractionDigits: 2
   *                    example: 1.99
   *                  carbohydrates:
   *                    type: number
   *                    format: double
   *                    maximumFractionDigits: 2
   *                    example: 1.99
   *                  fats:
   *                    type: number
   *                    format: double
   *                    maximumFractionDigits: 2
   *                    example: 1.99
   *                  saturated_fats:
   *                    type: number
   *                    format: double
   *                    maximumFractionDigits: 2
   *                    example: 1.99
   *                  sugars:
   *                    type: number
   *                    format: double
   *                    maximumFractionDigits: 2
   *                    example: 1.99
   *                  dietary_fiber:
   *                    type: number
   *                    format: double
   *                    maximumFractionDigits: 2
   *                    example: 1.99
   *                  description:
   *                    type: string
   *       responses:
   *         '201':
   *           description: Dish created successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Dish'
   *         '400':
   *           description: Error creating dish
   *   '/api/dishes/{id}':
   *     get:
   *       summary: Get a dish by ID
   *       tags: [Dishes]
   *       description: Retrieve a specific dish by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the dish to retrieve
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: Dish found
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Dish'
   *         '404':
   *           description: Error getting dish
   *     patch:
   *       summary: Update a dish info or a image
   *       tags: [Dishes]
   *       description: Update an existing dish's information or/a Image.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the dish to update
   *           schema:
   *             type: string
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *                type: object
   *                properties:
   *                  name:
   *                    type: string
   *                  category_id:
   *                    type: integer
   *                    example: 1
   *                  price:
   *                    type: number
   *                    format: double
   *                    maximumFractionDigits: 2
   *                    example: 1.99
   *                  weight:
   *                    type: number
   *                    format: double
   *                    maximumFractionDigits: 2
   *                    example: 1.99
   *                  calories:
   *                    type: number
   *                    format: double
   *                    maximumFractionDigits: 2
   *                    example: 1.99
   *                  proteins:
   *                    type: number
   *                    format: double
   *                    maximumFractionDigits: 2
   *                    example: 1.99
   *                  carbohydrates:
   *                    type: number
   *                    format: double
   *                    maximumFractionDigits: 2
   *                    example: 1.99
   *                  fats:
   *                    type: number
   *                    format: double
   *                    maximumFractionDigits: 2
   *                    example: 1.99
   *                  saturated_fats:
   *                    type: number
   *                    format: double
   *                    maximumFractionDigits: 2
   *                    example: 1.99
   *                  sugars:
   *                    type: number
   *                    format: double
   *                    maximumFractionDigits: 2
   *                    example: 1.99
   *                  dietary_fiber:
   *                    type: number
   *                    format: double
   *                    maximumFractionDigits: 2
   *                    example: 1.99
   *                  description:
   *                    type: string
   *           multipart/form-data:
   *             schema:
   *               type: object
   *               properties:
   *                  image:
   *                    type: string
   *                    format: binary
   *               required:
   *                - image
   *       responses:
   *         '200':
   *           description: Dish updated successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Dish'
   *         '404':
   *           description: Error updating dish
   *
   *     delete:
   *       summary: Delete a dish
   *       tags: [Dishes]
   *       description: Delete a dish by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the dish to delete
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: Dish deleted successfully
   *         '404':
   *           description: Error deleting dish
   * components:
   *   schemas:
   *     Dish:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *           example: 1
   *         name:
   *           type: string
   *         price:
   *           type: number
   *           format: double
   *           maximumFractionDigits: 2
   *           example: 1.99
   *         weight:
   *           type: number
   *           format: double
   *           maximumFractionDigits: 2
   *           example: 1.99
   *         calories:
   *           type: number
   *           format: double
   *           maximumFractionDigits: 2
   *           example: 1.99
   *         proteins:
   *           type: number
   *           format: double
   *           maximumFractionDigits: 2
   *           example: 1.99
   *         carbohydrates:
   *           type: number
   *           format: double
   *           maximumFractionDigits: 2
   *           example: 1.99
   *         fats:
   *           type: number
   *           format: double
   *           maximumFractionDigits: 2
   *           example: 1.99
   *         saturated_fats:
   *           type: number
   *           format: double
   *           maximumFractionDigits: 2
   *           example: 1.99
   *         sugars:
   *           type: number
   *           format: double
   *           maximumFractionDigits: 2
   *           example: 1.99
   *         dietary_fiber:
   *           type: number
   *           format: double
   *           maximumFractionDigits: 2
   *           example: 1.99
   *         description:
   *           type: string
   *         image:
   *           type: string
   *           format: binary
   *         createdAt:
   *           type: string
   *           format: date-time
   *         updatedAt:
   *           type: string
   *           format: date-time
   *         category:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   */

  // RUTAS
  dishesRouter.get("/", dishController.getAll);
  dishesRouter.post("/", upload.single("image"), dishController.create);
  dishesRouter.get("/:id", dishController.getById);
  dishesRouter.patch("/:id", upload.single("image"), dishController.update);
  dishesRouter.delete("/:id", dishController.delete);

  return dishesRouter;
}

export default DishRouter;
