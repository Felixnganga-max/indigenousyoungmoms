const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dnfsusp59",
  api_key: process.env.CLOUDINARY_API_KEY || "626761856113988",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "aAmQQCqr5E5kFx_SXk-2fU0r7Sg",
});

// Create storage engine for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "community-gallery",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    transformation: [{ width: 1000, height: 1000, crop: "limit" }],
  },
});

// Configure Multer middleware for multiple file uploads (up to 5)
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB per file
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
}).array("images", 10);

module.exports = {
  cloudinary,
  upload,
};
