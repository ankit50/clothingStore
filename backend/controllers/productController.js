import uploadOnCloudinary from "../config/cloudinary.js";
import fs from "fs";
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    // Filter only defined images
    const images = [image1, image2, image3, image4].filter(
      (image) => image !== undefined
    );
    // Upload each image to Cloudinary and collect URLs
    const uploadedImageUrls = [];
    for (const img of images) {
      const cloudinaryUrl = await uploadOnCloudinary(img.path);
      if (cloudinaryUrl) {
        uploadedImageUrls.push(cloudinaryUrl);
      }
      // Clean up local file after upload
      fs.unlinkSync(img.path);
    }
    console.log(uploadedImageUrls);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const listProducts = async (req, res) => {};

const removeProduct = async (req, res) => {};

const singleProduct = async (req, res) => {};

export { addProduct, listProducts, removeProduct, singleProduct };
