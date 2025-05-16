import multer from "multer";

// Set up storage configuration for multer
const storage = multer.diskStorage({
  // Destination defines where uploaded files will be stored
  destination: function (req, file, callback) {
    callback(null, "./public/temp");
  },
  // Filename defines how files will be named when stored
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

// Create the multer upload middleware with the configured storage engine
const upload = multer({
  storage,
});

export default upload;
