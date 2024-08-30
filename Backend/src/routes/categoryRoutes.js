import { Router } from "express";
import CategoryController from "../controllers/category.js";

function CategoryRouter({ categoryModel }) {
  const categoryRoutes = Router();
  const categoryController = new CategoryController({ categoryModel });

  // DOCUMENTATION
  /**
   * @openapi
   * paths:
   *   /api/categories:
   *     get:
   *       summary: Get all categories
   *       tags: [Categories]
   *       description: Retrieve a list of all available categories.
   *       responses:
   *         '200':
   *           description: A list of categories
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/Category'
   *         '404':
   *            description: Error getting categories
   *     post:
   *       summary: Create a category
   *       tags: [Categories]
   *       description: Create a new category.
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  name:
   *                    type: string
   *       responses:
   *         '201':
   *           description: Category created successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Category'
   *         '400':
   *           description: Error creating category
   *   '/api/categories/{id}':
   *     get:
   *       summary: Get a category by ID
   *       tags: [Categories]
   *       description: Retrieve a specific category by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the category to retrieve
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: Category found
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Category'
   *         '404':
   *           description: Category not found
   *     patch:
   *       summary: Update a category
   *       tags: [Categories]
   *       description: Update an existing category's information.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the category to update
   *           schema:
   *             type: string
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  name:
   *                    type: string
   *       responses:
   *         '200':
   *           description: Category updated successfully
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Category'
   *         '404':
   *           description: Error updating category
   *     delete:
   *       summary: Delete a category
   *       tags: [Categories]
   *       description: Delete a category by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the category to delete
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: Category deleted successfully
   *         '404':
   *           description: Error deleting category
   * components:
   *   schemas:
   *     Category:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *           example: 1
   *         name:
   *           type: string
   *         createdAt:
   *           type: string
   *           format: date-time
   *         updatedAt:
   *           type: string
   *           format: date-time
   */

  // API ROUTES
  categoryRoutes.get("/", categoryController.getAll);
  categoryRoutes.post("/", categoryController.create);
  categoryRoutes.patch("/:id", categoryController.update);
  categoryRoutes.delete("/:id", categoryController.delete);
  categoryRoutes.get("/:id", categoryController.getById);

  return categoryRoutes;
}

export default CategoryRouter;
