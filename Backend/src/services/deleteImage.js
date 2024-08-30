import cloudinary from "../config/cloudinary.js";

const deleteOldImage = async (dish) => {
  if (dish.image && dish.image.includes("cloudinary.com")) {
    const publicId = dish.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(
      `projects/tasty_trails/dishes/${publicId}`
    );
  }
};

export default deleteOldImage;
