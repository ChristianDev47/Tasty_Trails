import { Router } from "express";
import DishStatusController from "../controllers/dishStatus.js";

function DishStatusRouter({ dishStatusModel }) {
  const dishStatusRouter = Router();
  const dishStatusController = new DishStatusController({ dishStatusModel });

  // DOCUMENTATION
  /**
   * @openapi
   * paths:
   *   /api/dishStatus:
   *     get:
   *       summary: Get all dishes status
   *       tags: [Dishes Status]
   *       description: Retrieve a list of all available status.
   *       responses:
   *         '200':
   *           description: A list of status
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/DishStatus'
   *         '404':
   *           description: Error getting status
   *     post:
   *       summary: Create a dishes status
   *       tags: [Dishes Status]
   *       description: Create a new status.
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 name:
   *                   type: string
   *       responses:
   *         '201':
   *           description: State created successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/DishStatus'
   *         '400':
   *           description: Error creating status
   *   '/api/dishStatus/{id}':
   *     get:
   *       summary: Get a dishes status by ID
   *       tags: [Dishes Status]
   *       description: Retrieve a specific status by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the status to retrieve
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: State found
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/DishStatus'
   *         '404':
   *           description: Error getting status
   *     patch:
   *       summary: Update a dishes status
   *       tags: [Dishes Status]
   *       description: Update an existing status's information.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the status to update
   *           schema:
   *             type: string
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 name:
   *                   type: string
   *       responses:
   *         '200':
   *           description: Status updated successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/DishStatus'
   *         '400':
   *           description: Error updating status
   *     delete:
   *       summary: Delete a dishes status
   *       tags: [Dishes Status]
   *       description: Delete a status by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the status to delete
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: Status deleted successfully
   *         '404':
   *           description: Error deleting status
   * components:
   *   schemas:
   *     DishStatus:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *           example: 1
   *         name:
   *           type: string
   *           example: string
   */
  // RUTAS
  dishStatusRouter.get("/", dishStatusController.getAll);
  dishStatusRouter.post("/", dishStatusController.create);
  dishStatusRouter.get("/:id", dishStatusController.getById);
  dishStatusRouter.patch("/:id", dishStatusController.update);
  dishStatusRouter.delete("/:id", dishStatusController.delete);

  return dishStatusRouter;
}

export default DishStatusRouter;
