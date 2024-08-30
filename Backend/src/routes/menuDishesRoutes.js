import { Router } from "express";
import MenuDishesController from "../controllers/menuDishes.js";

function MenuDishesRouter({ menuDishesModel }) {
  const menuDishesRouter = Router();
  const menuDishesController = new MenuDishesController({ menuDishesModel });

  // DOCUMENTATION
  /**
   * @openapi
   * paths:
   *   /api/menuDishes:
   *     get:
   *       summary: Get all dishes from menu
   *       tags: [Menu Dishes]
   *       description: Retrieve a list of all dishes from menu.
   *       responses:
   *         '200':
   *           description: A list of dishes from menu
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/MenuDishes'
   *         '404':
   *           description: Error getting menu dishes
   *     post:
   *       summary: Add an dish to the menu
   *       tags: [Menu Dishes]
   *       description: Add a new dish to the menu.
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  user_id:
   *                    type: integer
   *                    example: 1
   *                  dish_id:
   *                    type: integer
   *                    example: 1
   *                  dish_status_id:
   *                    type: integer
   *                    example: 1
   *       responses:
   *         '201':
   *           description: Dish added to the menu successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/MenuDishes'
   *         '400':
   *           description: Error adding dish to menu
   *   '/api/menuDishes/{id}':
   *     get:
   *       summary: Get an dish in the menu by ID
   *       tags: [Menu Dishes]
   *       description: Retrieve a specific dish in the menu by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the dish in the menu to retrieve
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: Dish in the menu found
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/MenuDishes'
   *         '404':
   *           description: Error getting menu dish
   *     patch:
   *       summary: Update an dish in the menu
   *       tags: [Menu Dishes]
   *       description: Update an existing dish in the menu's information.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the dish in the menu to update
   *           schema:
   *             type: string
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *            schema:
   *               type: object
   *               properties:
   *                  dish_status_id:
   *                    type: integer
   *                    example: 1
   *       responses:
   *         '200':
   *           description: Dish in the menu updated successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/MenuDishes'
   *         '400':
   *           description: Error updating dish in menu
   *     delete:
   *       summary: Remove an item from the menu
   *       tags: [Menu Dishes]
   *       description: Remove an dish from the menu by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the dish in the menu to remove
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: Dish removed from the menu successfully
   *         '404':
   *           description: Error removing dish from menu
   * components:
   *   schemas:
   *     MenuDishes:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *           example: 1
   *         user_id:
   *           type: integer
   *           example: 1
   *         dish_id:
   *           type: integer
   *           example: 2
   *         dish:
   *            type: object
   *            properties:
   *               name:
   *                 type: string
   *               price:
   *                 type: number
   *                 format: double
   *                 maximumFractionDigits: 2
   *                 example: 1.99
   *               weight:
   *                 type: number
   *                 format: double
   *                 maximumFractionDigits: 2
   *                 example: 1.99
   *               calories:
   *                 type: number
   *                 format: double
   *                 maximumFractionDigits: 2
   *                 example: 1.99
   *               proteins:
   *                 type: number
   *                 format: double
   *                 maximumFractionDigits: 2
   *                 example: 1.99
   *               carbohydrates:
   *                 type: number
   *                 format: double
   *                 maximumFractionDigits: 2
   *                 example: 1.99
   *               fats:
   *                 type: number
   *                 format: double
   *                 maximumFractionDigits: 2
   *                 example: 1.99
   *               saturated_fats:
   *                 type: number
   *                 format: double
   *                 maximumFractionDigits: 2
   *                 example: 1.99
   *               sugars:
   *                 type: number
   *                 format: double
   *                 maximumFractionDigits: 2
   *                 example: 1.99
   *               dietary_fiber:
   *                 type: number
   *                 format: double
   *                 maximumFractionDigits: 2
   *                 example: 1.99
   *               description:
   *                 type: string
   *               image:
   *                 type: string
   *                 format: binary
   *               category_id:
   *                 type: number
   *                 example: 1
   *               category:
   *                 type: object
   *                 properties:
   *                   name:
   *                     type: string
   *         dish_status_id:
   *            type: integer
   *            example: 1
   *         Status:
   *            type: object
   *            properties:
   *               name:
   *                 type: string
   */

  // RUTAS
  menuDishesRouter.get("/", menuDishesController.getAll);
  menuDishesRouter.post("/", menuDishesController.create);
  menuDishesRouter.get("/:id", menuDishesController.getById);
  menuDishesRouter.patch("/:id", menuDishesController.update);
  menuDishesRouter.delete("/:id", menuDishesController.delete);

  return menuDishesRouter;
}

export default MenuDishesRouter;
