import { OrderStatus } from "./database/modelsDB.js";

class OrderStatusModel {
  // GET
  static async getAll() {
    try {
      const status = await OrderStatus.findAll();
      return status;
    } catch (error) {
      console.error(`Error getting statuses: ${error}`);
      throw new Error("Error getting statuses");
    }
  }

  // POST
  static async create({ status }) {
    try {
      const newStatus = await OrderStatus.create(status);
      return newStatus;
    } catch (error) {
      console.error("Error creating state:", error);
      throw new Error("Error creating state");
    }
  }

  // UPDATE
  static async update({ statusId, status }) {
    try {
      const [updatedRowsCount] = await OrderStatus.update(status, {
        where: { id: statusId },
      });

      if (updatedRowsCount === 0) {
        throw new Error("Status not found or no record was updated.");
      }
      const updatedStatus = await OrderStatus.findByPk(statusId);
      return updatedStatus;
    } catch (error) {
      console.error("Error updating status:", error);
      throw new Error("Error updating status.");
    }
  }

  // DELETE
  static async delete({ statusId }) {
    try {
      const deletedRowsCount = await OrderStatus.destroy({
        where: { id: statusId },
      });

      if (deletedRowsCount === 0) {
        throw new Error("State not found");
      }

      return { message: "Successfully deleted status" };
    } catch (error) {
      console.error("Error deleting state:", error);
      throw new Error("Error deleting state");
    }
  }

  // GET BY ID
  static async getById({ statusId }) {
    try {
      const status = await OrderStatus.findByPk(statusId);

      if (!status) {
        throw new Error("State not found");
      }
      return status;
    } catch (error) {
      console.error("Error getting status:", error);
      throw new Error("Error getting status");
    }
  }
}

export default OrderStatusModel;
