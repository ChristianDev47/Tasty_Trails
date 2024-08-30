import {
  validateCategory,
  validatePartialCategory,
} from "../schemas/validations/category.js";

class CategoryController {
  constructor({ categoryModel }) {
    this.categoryModel = categoryModel;
  }

  // GET
  getAll = async (req, res) => {
    try {
      const categories = await this.categoryModel.getAll();
      res.status(200).json(categories);
    } catch (error) {
      console.error("Error getting categories:", error);
      res.status(404).json({ error: "Error getting categories" });
    }
  };

  // CREATE
  create = async (req, res) => {
    try {
      const result = validateCategory(req.body);

      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      const newCategory = await this.categoryModel.create({
        category: result.data,
      });
      res.status(201).json(newCategory);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(400).json({ error: "Error creating category" });
    }
  };

  // UPDATE
  update = async (req, res) => {
    try {
      const result = validatePartialCategory(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      const categoryId = req.params.id;

      const updatedCategory = await this.categoryModel.update({
        categoryId,
        category: result.data,
      });
      res.status(200).json(updatedCategory);
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(400).json({ error: "Error updating category" });
    }
  };

  // DELETE
  delete = async (req, res) => {
    try {
      const categoryId = req.params.id;
      const deletedCategory = await this.categoryModel.delete({ categoryId });

      res.status(200).json(deletedCategory);
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(404).json({ error: "Error deleting category" });
    }
  };

  // GET BY ID
  getById = async (req, res) => {
    try {
      const categoryId = req.params.id;
      const category = await this.categoryModel.getById({ categoryId });

      res.status(200).json(category);
    } catch (error) {
      console.error("Error getting category:", error);
      res.status(404).json({ error: "Error getting category" });
    }
  };
}

export default CategoryController;
