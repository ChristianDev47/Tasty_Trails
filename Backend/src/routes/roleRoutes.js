import { Router } from "express";
import RoleController from "../controllers/role.js";

function RoleRouter({ roleModel }) {
  const rolesRouter = Router();
  const roleController = new RoleController({ roleModel });

  // DOCUMENTATION
  /**
   * @openapi
   * paths:
   *   /api/roles:
   *     get:
   *       summary: Get all roles
   *       tags: [Roles]
   *       description: Retrieve a list of all available roles.
   *       responses:
   *         '200':
   *           description: A list of roles
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   $ref: '#/components/schemas/Role'
   *         '404':
   *           description: Error getting roles
   *   '/api/roles/{id}':
   *     get:
   *       summary: Get a role by ID
   *       tags: [Roles]
   *       description: Retrieve a specific role by its ID.
   *       parameters:
   *         - name: id
   *           in: path
   *           required: true
   *           description: The ID of the role to retrieve
   *           schema:
   *             type: string
   *       responses:
   *         '200':
   *           description: Role found
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Role'
   *         '404':
   *           description: Error getting role
   * components:
   *   schemas:
   *     Role:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *           example: 1
   *         name:
   *           type: string
   */

  // RUTAS
  rolesRouter.get("/", roleController.getAll);
  rolesRouter.get("/:id", roleController.getById);

  return rolesRouter;
}

export default RoleRouter;
