import {
  validateDish,
  validatePartialDish,
} from "../schemas/validations/dish.js";
import deleteOldImage from "../services/deleteImage.js";

class DishController {
  constructor({ dishModel }) {
    this.dishModel = dishModel;
  }

  // GET ALL
  getAll = async (req, res) => {
    try {
      const dishes = await this.dishModel.getAll();
      res.status(200).json(dishes);
    } catch (error) {
      console.error("Error getting dishes:", error);
      res.status(404).json({ error: "Error getting dishes" });
    }
  };

  // CREATE
  create = async (req, res) => {
    try {
      const data = req.body;
      // Upload Image

      let imageName = "default_dish.jpg";
      const imagePath = `${process.env.CLOUDINARY_URL_IMAGE}/${imageName}`;

      const newDish = {
        ...data,
        image: imagePath,
      };
      const result = validateDish(newDish);

      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      const dish = await this.dishModel.create({ dish: newDish });
      res.status(201).json(dish);
    } catch (error) {
      console.error("Error creating dish:", error);
      res.status(400).json({ error: "Error creating dish" });
    }
  };

  // UPDATE
  update = async (req, res) => {
    try {
      const result = validatePartialDish(req.body);
      const dishId = req.params.id;

      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      let data = result.data;

      // Image Verification updated
      if (req.file) {
        // Getting old image to delete
        let imageName = "default_dish.jpg";
        const imagePath = `${process.env.CLOUDINARY_URL_IMAGE}/${imageName}`;
        if (req.file.path !== imagePath) {
          const dish = await this.dishModel.getById({ dishId });
          deleteOldImage(dish);
        }
        // Uploading the data of the new image
        // Upload Image
        data = {
          ...result.data,
          image: req.file.path,
        };
      }

      const updateDish = await this.dishModel.update({ dishId, dish: data });

      res.status(200).json(updateDish);
    } catch (error) {
      console.error("Error updating dish:", error);
      res.status(400).json({ error: "Error updating dish" });
    }
  };

  // DELETE
  delete = async (req, res) => {
    try {
      const dishId = req.params.id;
      // Getting old image to delete
      const dish = await this.dishModel.getById({ dishId });
      let imageName = "default_dish.jpg";
      const imagePath = `${process.env.CLOUDINARY_URL_IMAGE}/${imageName}`;
      if (dish.image !== imagePath) {
        deleteOldImage(dish);
      }

      // Deleted dish
      const result = await this.dishModel.delete({ dishId });
      res.status(200).json(result);
    } catch (error) {
      console.error("Error deleting dish:", error);
      res.status(404).json({ error: "Error deleting dish" });
    }
  };

  // GET BY ID
  getById = async (req, res) => {
    try {
      const dishId = req.params.id;
      const result = await this.dishModel.getById({ dishId: dishId });

      res.status(200).json(result);
    } catch (error) {
      console.error("Error getting dish:", error);
      res.status(404).json({ error: "Error getting dish" });
    }
  };
}

export default DishController;
