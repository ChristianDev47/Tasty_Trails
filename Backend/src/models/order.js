import { Dish, Order, OrderDetails, OrderStatus } from "./database/modelsDB.js";

class OrderModel {
  // GET
  static async getAll() {
    try {
      const orders = await Order.findAll({
        include: [
          {
            model: Dish,
            attributes: ["id", "name", "price", "image"],
            through: {
              model: OrderDetails,
              attributes: ["count"],
            },
            required: true,
          },
        ],
      });
      return orders;
    } catch (error) {
      console.error(`Error getting orders: ${error}`);
      throw new Error("Error getting orders");
    }
  }

  // POST
  static async create({ order }) {
    try {
      // Creeate order
      const newOrder = await Order.create(order);

      // Create order details
      const orderDetailsPromises = order.dishes.map(async (dish) => {
        return OrderDetails.create({
          order_id: newOrder.id,
          ...dish,
        });
      });
      await Promise.all(orderDetailsPromises);

      // Get new order
      const myCreatedOrder = await Order.findOne({
        where: { id: newOrder.id },
        include: [
          {
            model: Dish,
            attributes: ["name", "price"],
            through: {
              model: OrderDetails,
              attributes: ["count"],
            },
          },
        ],
      });

      return myCreatedOrder;
    } catch (error) {
      console.error("Error creating order:", error);
      throw new Error("Error creating order");
    }
  }

  // UPDATE
  static async update({ orderId, order }) {
    try {
      if (order) {
        const [updatedRowsCount] = await Order.update(order, {
          where: { id: orderId },
        });
        if (updatedRowsCount === 0) {
          throw new Error("Order not found or no record updated.");
        }
      }
      if (order && order.dishes) {
        await OrderDetails.destroy({
          where: { order_id: orderId },
        });
        order.dishes.forEach(async (dish) => {
          const newDish = {
            order_id: orderId,
            ...dish,
          };
          await OrderDetails.create(newDish);
        });
      }

      return { message: `Order updated with number ${orderId}` };
    } catch (error) {
      console.error("Error updating order:", error);
      throw new Error("Error updating order.");
    }
  }

  // DELETE
  static async delete({ orderId }) {
    try {
      const deletedRowsCount = await Order.destroy({
        where: { id: orderId },
      });

      if (deletedRowsCount === 0) {
        throw new Error("Order not found");
      }

      return { message: "Order successfully deleted" };
    } catch (error) {
      console.error("Error deleting order:", error);
      throw new Error("Error deleting order");
    }
  }

  // FINDBYID
  static async getById({ orderId }) {
    try {
      const order = await Order.findByPk(orderId, {
        include: [
          {
            model: Dish,
            attributes: ["id", "name", "price", "image"],
            through: {
              model: OrderDetails,
              attributes: ["count"],
            },
            required: true,
          },
        ],
      });

      if (!order) {
        throw new Error("Order not found");
      }
      return order;
    } catch (error) {
      console.error("Error getting Order:", error);
      throw new Error("Error getting Order");
    }
  }

  // FINDBYUSER
  static async getByUser({ userId }) {
    try {
      const order = await Order.findAll({
        where: { user_id: userId },
        include: [
          {
            model: Dish,
            attributes: ["id", "name", "price", "image"],
            through: {
              model: OrderDetails,
              attributes: ["count"],
            },
            required: true,
          },
          {
            model: OrderStatus,
            attributes: ["name"],
          },
        ],
      });

      if (!order) {
        throw new Error("Order not found");
      }
      return order;
    } catch (error) {
      console.error("Error getting Order:", error);
      throw new Error("Error getting Order");
    }
  }
}

export default OrderModel;
