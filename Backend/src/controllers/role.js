class RoleController {
  constructor({ roleModel }) {
    this.roleModel = roleModel;
  }

  // GET
  getAll = async (req, res) => {
    try {
      const role = await this.roleModel.getAll();
      res.json(role);
    } catch (error) {
      console.error("Error getting roles: ", error);
      res.status(404).json({ error: "Error getting roles" });
    }
  };

  // GET BY ID
  getById = async (req, res) => {
    try {
      const roleId = req.params.id;
      const result = await this.roleModel.getById({ roleId: roleId });

      res.json(result);
    } catch (error) {
      console.error("Error getting role: ", error);
      res.status(404).json({ error: "Error getting role" });
    }
  };
}

export default RoleController;
