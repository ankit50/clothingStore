import uploadOnCloudinary from "../config/cloudinary.js";
import productModel from "../models/productModel.js";
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
    //product data to be added to database
    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestSeller: bestSeller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: uploadedImageUrls,
      date: Date.now(),
    };
    const product = new productModel(productData);
    await product.save();
    res.json({ success: true, message: "Product added to database." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
