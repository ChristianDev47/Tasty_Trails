import { Category } from "../models/database/modelsDB.js";

class CategoryModel {
  // GET
  static async getAll() {
    try {
      const categories = await Category.findAll();
      return categories;
    } catch (error) {
      console.log("Error getting categories: ", error);
      throw new Error("Error getting categories");
    }
  }

  // POST
  static async create({ category }) {
    try {
      const newCategory = await Category.create(category);
      return newCategory;
    } catch (error) {
      console.log("Error creating category: ", error);
      throw new Error("Error creating category");
    }
  }

  // UPDATE
  static async update({ categoryId, category }) {
    try {
      const [updatedRowsCount] = await Category.update(category, {
        where: { id: categoryId },
      });

      if (updatedRowsCount === 0) {
        throw new Error("User not found or no record updated.");
      }

      const updateCategory = await Category.findByPk(categoryId);
      return updateCategory;
    } catch (error) {
      console.log("Error updating category: ", error);
      throw new Error("Error updating category");
    }
  }

  // DELETE
  static async delete({ categoryId }) {
    try {
      const deletedRowsCount = Category.destroy({
        where: { id: categoryId },
      });
      if (deletedRowsCount === 0) {
        throw new Error("Category not found");
      }

      return { message: "Category successfully deleted" };
    } catch (error) {
      console.log("Error deleting category: ", error);
      throw new Error("Error deleting category");
    }
  }

  // GET BY ID
  static async getById({ categoryId }) {
    try {
      const category = await Category.findByPk(categoryId);

      if (!category) {
        throw new Error("Category not found");
      }

      return category;
    } catch (error) {
      console.error("Error getting category:", error);
      throw new Error("Error getting category");
    }
  }
}

export default CategoryModel;
