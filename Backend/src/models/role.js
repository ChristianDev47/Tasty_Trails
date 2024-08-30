import { Role } from "./database/modelsDB.js";

class RoleModel {
  // GET
  static async getAll() {
    try {
      const roles = await Role.findAll();
      return roles;
    } catch (error) {
      console.error(`Error getting roles: ${error}`);
      throw new Error("Error getting roles");
    }
  }

  // GET BY ID
  static async getById({ roleId }) {
    try {
      const role = await Role.findByPk(roleId);

      if (!role) {
        throw new Error("Role not found");
      }
      return role;
    } catch (error) {
      console.error("Error getting role:", error);
      throw new Error("Error getting role");
    }
  }
}

export default RoleModel;
