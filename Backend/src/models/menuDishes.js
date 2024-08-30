import { MenuDishes, Dish, DishStatus, Category } from "./database/modelsDB.js";

class MenuDishesModel {
  // GET
  static async getAll() {
    try {
      const dishes = await MenuDishes.findAll({
        include: [
          {
            model: Dish,
            attributes: [
              "name",
              "price",
              "weight",
              "calories",
              "proteins",
              "carbohydrates",
              "fats",
              "saturated_fats",
              "sugars",
              "dietary_fiber",
              "description",
              "image",
              "category_id",
            ],
            include: [{ model: Category, attributes: ["id", "name"] }],
          },

          { model: DishStatus, attributes: ["name"] },
        ],
        attributes: ["user_id", "dish_id", "dish_status_id"],
      });
      return dishes;
    } catch (error) {
      console.log("Error getting dishes from menu: ", error);
      throw new Error("Error getting dishes from menu");
    }
  }

  // POST
  static async create({ menuDishes }) {
    try {
      const newMenuDishes = await MenuDishes.create(menuDishes);

      const myDish = await MenuDishes.findOne({
        where: { dish_id: newMenuDishes.dish_id },
        include: [
          {
            model: Dish,
            attributes: [
              "name",
              "price",
              "weight",
              "calories",
              "proteins",
              "carbohydrates",
              "fats",
              "saturated_fats",
              "sugars",
              "dietary_fiber",
              "description",
              "image",
              "category_id",
            ],
            include: [{ model: Category, attributes: ["id", "name"] }],
          },
          { model: DishStatus, attributes: ["name"] },
        ],
        attributes: ["user_id", "dish_id", "dish_status_id"],
      });
      return myDish;
    } catch (error) {
      console.log("Error adding dish to menu: ", error);
      throw new Error("Error adding dish to menu");
    }
  }

  // UPDATE
  static async update({ menuDishesId, menuDishes }) {
    try {
      const [updatedRowsCount] = await MenuDishes.update(menuDishes, {
        where: { dish_id: menuDishesId },
      });

      if (updatedRowsCount === 0) {
        throw new Error("Dish not found or no updated record.");
      }

      const myDish = await MenuDishes.findOne({
        where: { dish_id: menuDishesId },
        include: [
          {
            model: Dish,
            attributes: [
              "name",
              "price",
              "weight",
              "calories",
              "proteins",
              "carbohydrates",
              "fats",
              "saturated_fats",
              "sugars",
              "dietary_fiber",
              "description",
              "image",
              "category_id",
            ],
            include: [{ model: Category, attributes: ["id", "name"] }],
          },
          { model: DishStatus, attributes: ["name"] },
        ],
        attributes: ["user_id", "dish_id", "dish_status_id"],
      });
      return myDish;
    } catch (error) {
      console.log("Error updating menu dish: ", error);
      throw new Error("Error updating menu dish");
    }
  }

  // DELETE
  static async delete({ menuDishesId }) {
    try {
      const deletedRowsCount = await MenuDishes.destroy({
        where: { dish_id: menuDishesId },
      });

      if (deletedRowsCount === 0) {
        throw new Error("Menu dish not found");
      }

      return { message: "Menu dish removed successfully" };
    } catch (error) {
      console.error("Error removing dish from menu:", error);
      throw new Error("Error removing dish from menu");
    }
  }

  // FINDBYID
  static async getById({ menuDishesId }) {
    try {
      const myDish = await MenuDishes.findOne({
        where: { dish_id: menuDishesId },
        include: [
          {
            model: Dish,
            attributes: [
              "name",
              "price",
              "weight",
              "calories",
              "proteins",
              "carbohydrates",
              "fats",
              "saturated_fats",
              "sugars",
              "dietary_fiber",
              "description",
              "image",
              "category_id",
            ],
            include: [{ model: Category, attributes: ["id", "name"] }],
          },
          { model: DishStatus, attributes: ["name"] },
        ],
        attributes: ["user_id", "dish_id", "dish_status_id"],
      });

      if (!myDish) {
        throw new Error("Menu dish not found");
      }

      return myDish;
    } catch (error) {
      console.error("Error getting Dish from menu:", error);
      throw new Error("Error getting Dish from menu");
    }
  }
}

export default MenuDishesModel;
