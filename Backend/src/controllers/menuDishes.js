import {
  validateMenuDishes,
  validatePartialMenuDishes,
} from "../schemas/validations/menuDishes.js";

class MenuDishesController {
  constructor({ menuDishesModel }) {
    this.menuDishesModel = menuDishesModel;
  }

  // GET ALL
  getAll = async (req, res) => {
    try {
      const menuDisheses = await this.menuDishesModel.getAll();
      res.status(200).json(menuDisheses);
    } catch (error) {
      console.error("Error getting menu dishes:", error);
      res.status(404).json({ error: "Error getting menu dishes" });
    }
  };

  // CREATE
  create = async (req, res) => {
    try {
      const result = validateMenuDishes(req.body);

      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const menuDishes = await this.menuDishesModel.create({
        menuDishes: result.data,
      });
      res.status(201).json(menuDishes);
    } catch (error) {
      console.error("Error adding dish to menu:", error);
      res.status(400).json({ error: "Error adding dish to menu" });
    }
  };

  // UPDATE
  update = async (req, res) => {
    try {
      const result = validatePartialMenuDishes(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      const menuDishesId = req.params.id;
      const updateMenuDishes = await this.menuDishesModel.update({
        menuDishesId: menuDishesId,
        menuDishes: result.data,
      });

      res.status(200).json(updateMenuDishes);
    } catch (error) {
      console.error("Error updating dish in menu:", error);
      res.status(400).json({ error: "Error updating dish in menu" });
    }
  };

  // DELETE
  delete = async (req, res) => {
    try {
      const menuDishesId = req.params.id;
      const result = await this.menuDishesModel.delete({
        menuDishesId: menuDishesId,
      });
      res.status(200).json(result);
    } catch (error) {
      console.error("Error removing dish from menu:", error);
      res.status(404).json({ error: "Error removing dish from menu" });
    }
  };

  // GETBYID
  getById = async (req, res) => {
    try {
      const menuDishesId = req.params.id;
      const result = await this.menuDishesModel.getById({
        menuDishesId: menuDishesId,
      });

      res.status(200).json(result);
    } catch (error) {
      console.error("Error getting menu dish:", error);
      res.status(404).json({ error: "Error getting menu dish" });
    }
  };
}

export default MenuDishesController;
