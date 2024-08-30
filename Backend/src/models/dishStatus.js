import { DishStatus } from "./database/modelsDB.js";

class DishStatusModel {
  // GET
  static async getAll() {
    try {
      const status = await DishStatus.findAll();
      return status;
    } catch (error) {
      console.error(`Error when obtaining the status of the pallets: ${error}`);
      throw new Error("Error when obtaining the status of the pallets");
    }
  }

  // POST
  static async create({ status }) {
    try {
      const newDishStatus = await DishStatus.create(status);
      return newDishStatus;
    } catch (error) {
      console.error("Error creating state:", error);
      throw new Error("Error creating state");
    }
  }

  // UPDATE
  static async update({ statusId, status }) {
    try {
      const [updatedRowsCount] = await DishStatus.update(status, {
        where: { id: statusId },
      });

      if (updatedRowsCount === 0) {
        throw new Error("Status not found or no record was updated.");
      }
      const updatedDishStatus = await DishStatus.findByPk(statusId);
      return updatedDishStatus;
    } catch (error) {
      console.error("Error updating status:", error);
      throw new Error("Error updating status.");
    }
  }

  // DELETE
  static async delete({ statusId }) {
    try {
      const deletedRowsCount = await DishStatus.destroy({
        where: { id: statusId },
      });

      if (deletedRowsCount === 0) {
        throw new Error("Status not found");
      }

      return { message: "Successfully deleted status" };
    } catch (error) {
      console.error("Error deleting saucer state:", error);
      throw new Error("Error deleting saucer state");
    }
  }

  // GET BY ID
  static async getById({ statusId }) {
    try {
      const status = await DishStatus.findByPk(statusId);

      if (!status) {
        throw new Error("Status not found");
      }
      return status;
    } catch (error) {
      console.error("Error getting status:", error);
      throw new Error("Error getting status");
    }
  }
}

export default DishStatusModel;
