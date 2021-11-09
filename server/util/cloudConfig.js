const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "profiles",
//     format: async (req, file) => "jpeg",
//   },
// });

// const docStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "notes",
//     format: async (req, file) => "pdf",
//   },
// });
module.exports = { cloudinary };
