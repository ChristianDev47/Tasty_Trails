import {
  validateStatus,
  validatePartialStatus,
} from "../schemas/validations/status.js";

class DishStatusController {
  constructor({ dishStatusModel }) {
    this.dishStatusModel = dishStatusModel;
  }

  // GetAll
  getAll = async (req, res) => {
    try {
      const dishStatus = await this.dishStatusModel.getAll();
      res.status(200).json(dishStatus);
    } catch (error) {
      console.error("Error getting status:", error);
      res.status(404).json({ error: "Error getting status" });
    }
  };

  // Create
  create = async (req, res) => {
    try {
      const result = validateStatus(req.body);
      if (!result.success) {
        return res
          .dishStatus(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const newStatus = await this.dishStatusModel.create({
        status: result.data,
      });

      res.status(201).json(newStatus);
    } catch (error) {
      console.error("Error creating status:", error);
      res.status(400).json({ error: "Error creating status" });
    }
  };

  // Update
  update = async (req, res) => {
    try {
      const result = validatePartialStatus(req.body);
      if (!result.success) {
        return res
          .dishStatus(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      const statusId = req.params.id;
      const updateStatus = await this.dishStatusModel.update({
        statusId,
        status: result.data,
      });

      res.status(200).json(updateStatus);
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(400).json({ error: "Error updating status" });
    }
  };

  // Delete
  delete = async (req, res) => {
    try {
      const statusId = req.params.id;
      const result = await this.dishStatusModel.delete({ statusId });
      res.status(200).json(result);
    } catch (error) {
      console.error("Error deleting status:", error);
      res.status(404).json({ error: "Error deleting status" });
    }
  };

  // getById
  getById = async (req, res) => {
    try {
      const statusId = req.params.id;
      const result = await this.dishStatusModel.getById({ statusId });

      res.status(200).json(result);
    } catch (error) {
      console.error("Error getting status:", error);
      res.status(404).json({ error: "Error getting status" });
    }
  };
}

export default DishStatusController;
