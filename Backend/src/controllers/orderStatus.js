import {
  validateStatus,
  validatePartialStatus,
} from "../schemas/validations/status.js";

class OrderStatusController {
  constructor({ orderStatusModel }) {
    this.orderStatusModel = orderStatusModel;
  }

  // GET ALL
  getAll = async (req, res) => {
    try {
      const status = await this.orderStatusModel.getAll();
      res.status(200).json(status);
    } catch (error) {
      console.error("Error getting status:", error);
      res.status(404).json({ error: "Error getting status" });
    }
  };

  // CREATE
  create = async (req, res) => {
    try {
      const result = validateStatus(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const newStatus = await this.orderStatusModel.create({
        status: result.data,
      });

      res.status(201).json(newStatus);
    } catch (error) {
      console.error("Error creating status:", error);
      res.status(400).json({ error: "Error creating status" });
    }
  };

  // UPDATE
  update = async (req, res) => {
    try {
      const result = validatePartialStatus(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      const statusId = req.params.id;
      const updateStatus = await this.orderStatusModel.update({
        statusId: statusId,
        status: result.data,
      });

      res.status(200).json(updateStatus);
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(400).json({ error: "Error updating status" });
    }
  };

  // DELETE
  delete = async (req, res) => {
    try {
      const statusId = req.params.id;
      const result = await this.orderStatusModel.delete({ statusId: statusId });
      res.status(200).json(result);
    } catch (error) {
      console.error("Error deleting status:", error);
      res.status(404).json({ error: "Error deleting status" });
    }
  };

  // GET BY ID
  getById = async (req, res) => {
    try {
      const statusId = req.params.id;
      const result = await this.orderStatusModel.getById({
        statusId: statusId,
      });

      res.status().json(result);
    } catch (error) {
      console.error("Error getting status:", error);
      res.status(404).json({ error: "Error getting status" });
    }
  };
}

export default OrderStatusController;
