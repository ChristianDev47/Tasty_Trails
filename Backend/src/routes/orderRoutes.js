import { Router } from "express";
import OrderController from "../controllers/order.js";

function OrderRouter({ orderModel }) {
  const ordersRouter = Router();
  const orderController = new OrderController({ orderModel });

  // DOCUMENTATION
  /**
   * @openapi
   * paths:
   *   /api/orders:
   *     get:
   *       summary: Get all orders
   *       tags: [Orders]
   *       description: Retrieve a list of all orders.
   *       responses:
   *         '200':
   *           description: A list of orders
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/Order'
   *         '404':
   *           description: Error getting orders
   *     post:
   *       summary: Create a new order with dishes
   *       tags: [Orders]
   *       description: Create a new order along with the associated dishes.
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  user_id:
   *                    type: integer
   *                    example: 1
   *                  order_status_id:
   *                    type: integer
   *                    example: 1
   *                  direction:
   *                    type: string
   *                  phone:
   *                    type: string
   *                  dishes:
   *                    type: array
   *                    items:
   *                      $ref: '#/components/schemas/DishInOrderEdit'
   *              total:
   *                type: number
   *                format: double
   *                maximumFractionDigits: 2
   *                example: 100.99
   *       responses:
   *         '201':
   *           description: Order created successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Order'
   *         '400':
   *           description: Error creating order
   *
   *   '/api/orders/{id}':
   *     get:
   *       summary: Get a order by ID
   *       tags: [Orders]
   *       description: Retrieve a specific order by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the order to retrieve
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: Order found
   *           content:
   *             application/json:
   *               schema:
   *                 type: object
   *                 properties:
   *                   order:
   *                     $ref: '#/components/schemas/Order'
   *         '404':
   *           description: Error getting order
   *     patch:
   *       summary: Update a order
   *       tags: [Orders]
   *       description: Update an existing order's information.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the order to update
   *           schema:
   *             type: string
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  user_id:
   *                    type: integer
   *                    example: 1
   *                  order_status_id:
   *                    type: integer
   *                    example: 1
   *                  direction:
   *                    type: string
   *                  phone:
   *                    type: string
   *                  dishes:
   *                    type: array
   *                    items:
   *                      $ref: '#/components/schemas/DishInOrderEdit'
   *       responses:
   *         '200':
   *           description: Order updated successfully
   *           content:
   *             application/json:
   *               schema:
   *                 type: object
   *                 properties:
   *                   order:
   *                     $ref: '#/components/schemas/Order'
   *                   dishes:
   *                     type: array
   *                     items:
   *                       $ref: '#/components/schemas/DishInOrderEdit'
   *         '400':
   *           description: Error updating order
   *     delete:
   *       summary: Delete a order
   *       tags: [Orders]
   *       description: Delete a order by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the order to delete
   *           schema:
   *             type: string
   *       responses:
   *         '204':
   *           description: Order deleted successfully
   *         '404':
   *           description: Error deleting order
   *   '/api/orders/user/{id}':
   *     get:
   *       summary: Get a order by userID
   *       tags: [Orders]
   *       description: Retrieve a specific order by userID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The userID of the order to retrieve
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: Order found
   *           content:
   *             application/json:
   *               schema:
   *                 type: object
   *                 properties:
   *                   order:
   *                     $ref: '#/components/schemas/Order'
   *         '404':
   *           description: Error getting orders
   * components:
   *     schemas:
   *         DishInOrder:
   *            type: object
   *            properties:
   *              dish_id:
   *                type: integer
   *                example: 1
   *              name:
   *                type: string
   *              price:
   *                type: number
   *                format: double
   *                maximumFractionDigits: 2
   *                exmple: 1.99
   *              image:
   *                type: string
   *              order_details:
   *                type: object
   *                properties:
   *                  count:
   *                    type: integer
   *                    example: 1
   *         DishInOrderEdit:
   *            type: object
   *            properties:
   *              dish_id:
   *                type: integer
   *                example: 1
   *              count:
   *                type: integer
   *                example: 2   
   *         Order:
   *           type: object
   *           properties:
   *             id:
   *               type: integer
   *               example: 1
   *             user_id:
   *               type: integer
   *               example: 1
   *             status_id:
   *               type: integer
   *               example: 2
   *             direction:
   *               type: string
   *             phone:
   *               type: string
   *             total:
   *               type: number
   *               format: double
   *               maximumFractionDigits: 2
   *               exmple: 100.99
   *             dishes:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/DishInOrder'

   */

  // RUTAS
  ordersRouter.get("/", orderController.getAll);
  ordersRouter.post("/", orderController.create);
  ordersRouter.get("/:id", orderController.getById);
  ordersRouter.get("/user/:id", orderController.getByUser);
  ordersRouter.patch("/:id", orderController.update);
  ordersRouter.delete("/:id", orderController.delete);

  return ordersRouter;
}

export default OrderRouter;
