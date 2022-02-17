const cors = require("cors");
var whitelist = [
  "https://better--note.herokuapp.com",
  "https://betternote.netlify.app",
  "https://better--note.herokuapp.com/api/notes",
  "https://better--note.herokuapp.com/api/auth/verify-email",
];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = {
      origin: "https://better--note.herokuapp.com/",
      credentials: true,
    }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

module.exports = corsOptionsDelegate;
