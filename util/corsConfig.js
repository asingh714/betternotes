const cors = require("cors");
const whitelist = ["http://localhost:3000", "https://betternote.netlify.app"];
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) return callback(null, true);

    callback(new Error("Not allowed by CORS"));
  },
};

module.exports = corsOptions;
