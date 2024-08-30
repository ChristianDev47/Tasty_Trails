import {
  validateOrder,
  validatePartialOrder,
} from "../schemas/validations/order.js";

class OrderController {
  constructor({ orderModel }) {
    this.orderModel = orderModel;
  }

  // GET ALL
  getAll = async (req, res) => {
    try {
      const orders = await this.orderModel.getAll();
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error getting orders:", error);
      res.status(404).json({ error: "Error getting orders" });
    }
  };

  // CREATE
  create = async (req, res) => {
    try {
      const orderDishes = req.body;

      const data = {
        ...orderDishes,
      };

      const result = validateOrder(data);

      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      const newOrder = await this.orderModel.create({ order: result.data });
      res.status(201).json(newOrder);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(400).json({ error: "Error creating order" });
    }
  };

  // UPDATE
  update = async (req, res) => {
    try {
      const orderDishes = req.body;
      const data = {
        ...orderDishes,
        total: 0,
      };
      const result = validatePartialOrder(data);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      const orderId = req.params.id;

      const updatedOrder = await this.orderModel.update({
        orderId: orderId,
        order: result.data,
      });
      res.status(201).json(updatedOrder);
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(400).json({ error: "Error updating order" });
    }
  };

  // DELETE
  delete = async (req, res) => {
    try {
      const orderId = req.params.id;
      const deletedOrder = await this.orderModel.delete({ orderId: orderId });

      res.status(200).json(deletedOrder);
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(404).json({ error: "Error deleting order" });
    }
  };

  // GET BY ID
  getById = async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await this.orderModel.getById({ orderId: orderId });

      res.status(200).json(order);
    } catch (error) {
      console.error("Error getting order:", error);
      res.status(404).json({ error: "Error getting order" });
    }
  };

  // GET BY USER
  getByUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const order = await this.orderModel.getByUser({ userId });

      res.status(200).json(order);
    } catch (error) {
      console.error("Error getting orders:", error);
      res.status(404).json({ error: "Error getting orders" });
    }
  };
}

export default OrderController;
