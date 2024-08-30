import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "projects/tasty_trails/dishes",
    format: async (req, file) => {
      "jpg", "png", "jpeg";
    },
    public_id: (req, file) => `dish_${Date.now()}`,
  },
});

const upload = multer({ storage: storage });

export default upload;
