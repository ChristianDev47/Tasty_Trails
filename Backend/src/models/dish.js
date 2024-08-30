import { Category, Dish } from "../models/database/modelsDB.js";

class DishModel {
  // GET
  static async getAll() {
    try {
      const dishes = await Dish.findAll({
        include: {
          model: Category,
          attributes: ["name"],
        },
        attributes: { exclude: ["category_id"] },
      });
      return dishes;
    } catch (error) {
      console.log("Error getting the dishes: ", error);
      throw new Error("Error getting the dishes");
    }
  }

  // POST
  static async create({ dish }) {
    try {
      const newDish = await Dish.create(dish);
      const allDish = await Dish.findByPk(newDish.id, {
        include: {
          model: Category,
          attributes: ["name"],
        },
        attributes: { exclude: ["category_id"] },
      });
      return allDish;
    } catch (error) {
      console.log("Error creating dish: ", error);
      throw new Error("Error creating dish");
    }
  }

  // UPDATE
  static async update({ dishId, dish }) {
    try {
      const [updatedRowsCount] = await Dish.update(dish, {
        where: { id: dishId },
      });

      if (updatedRowsCount === 0) {
        throw new Error("Dish not found or no record updated.");
      }

      const updatedDish = await Dish.findByPk(dishId, {
        include: {
          model: Category,
          attributes: ["name"],
        },
        attributes: { exclude: ["category_id"] },
      });
      return updatedDish;
    } catch (error) {
      console.log("Error updating dish: ", error);
      throw new Error("Error updating dish");
    }
  }

  // DELETE
  static async delete({ dishId }) {
    try {
      const deletedRowsCount = await Dish.destroy({
        where: { id: dishId },
      });

      if (deletedRowsCount === 0) {
        throw new Error("Dish not found");
      }

      return { message: "Dish successfully removed" };
    } catch (error) {
      console.error("Error deleting dish:", error);
      throw new Error("Error deleting dish");
    }
  }

  // GET BY ID
  static async getById({ dishId }) {
    try {
      const platillo = await Dish.findByPk(dishId, {
        include: {
          model: Category,
          attributes: ["name"],
        },
        attributes: { exclude: ["category_id"] },
      });

      if (!platillo) {
        throw new Error("Dish not found");
      }

      return platillo;
    } catch (error) {
      console.error("Error getting dish:", error);
      throw new Error("Error getting dish");
    }
  }
}

export default DishModel;
