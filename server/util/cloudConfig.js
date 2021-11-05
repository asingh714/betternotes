const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const docStorage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "notes",
  allowedFormats: ["pdf"],
});

module.exports = { docStorage };
