import { Router } from "express";
import OrderStatusController from "../controllers/orderStatus.js";

function OrderStatusRouter({ orderStatusModel }) {
  const orderStatusRouter = Router();
  const orderStatusController = new OrderStatusController({ orderStatusModel });

  // DOCUMENTATION
  /**
   * @openapi
   * paths:
   *   /api/orderStatus:
   *     get:
   *       summary: Get all order status
   *       tags: [Order Status]
   *       description: Retrieve a list of all available status.
   *       responses:
   *         '200':
   *           description: A list of status
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/Status'
   *         '404':
   *           description: Error getting status
   *     post:
   *       summary: Create a order status
   *       tags: [Order Status]
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
   *           description: Status created successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Status'
   *         '400':
   *           description: Error creating status
   *   '/api/orderStatus/{id}':
   *     get:
   *       summary: Get a order status by ID
   *       tags: [Order Status]
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
   *           description: Status found
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Status'
   *         '404':
   *           description: Error getting status
   *     patch:
   *       summary: Update a order status
   *       tags: [Order Status]
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
   *                 $ref: '#/components/schemas/Status'
   *         '400':
   *           description: Error updating status
   *     delete:
   *       summary: Delete a order status
   *       tags: [Order Status]
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
   *     Status:
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
  orderStatusRouter.get("/", orderStatusController.getAll);
  orderStatusRouter.post("/", orderStatusController.create);
  orderStatusRouter.get("/:id", orderStatusController.getById);
  orderStatusRouter.patch("/:id", orderStatusController.update);
  orderStatusRouter.delete("/:id", orderStatusController.delete);

  return orderStatusRouter;
}

export default OrderStatusRouter;
