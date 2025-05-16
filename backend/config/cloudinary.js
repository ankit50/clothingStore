import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.COLUDINARY_API_KEY,
  api_secret: process.env.COLUDINARY_SECRET_KEY,
});
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }
    //upload file to cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //after upload
    return response.secure_url;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove locally saved file as upload fails
    return null;
  }
};

export default uploadOnCloudinary;
