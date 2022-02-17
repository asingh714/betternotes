require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const { corsOptionsDelegate } = require("./util/corsConfig");

const server = express();
server.use(cors());
// server.options("*", cors());
// server.use(
//   // cors(corsOptionsDelegate)
//   cors({
//     origin: [
//       "https://better--note.herokuapp.com/*",
//       "https://betternote.netlify.app",
//       "https://better--note.herokuapp.com/api/notes",
//       "https://better--note.herokuapp.com/api/auth/verify-email/*",
//     ],
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"],
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//   })
// );
const allowedOrigins = [
  "https://better--note.herokuapp.com",
  "https://betternote.netlify.app",
  "https://better--note.herokuapp.com/api/notes",
  "https://better--note.herokuapp.com/api/auth/verify-email",
];
server.use(function (req, res, next) {
  let origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin); // restrict it to the required domain
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.use(helmet());
server.use(express.static("public"));
server.use(express.json());
server.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

server.use(morgan("tiny"));

const port = process.env.PORT || "8080";
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const notesRouter = require("./routes/notesRouter");
const orderRouter = require("./routes/orderRouter");
const stripeRouter = require("./routes/stripeRouter");

const notFound = require("./middleware/notFound");

server.use("/api/auth", authRouter);
server.use("/api/user", userRouter);
server.use("/api/notes", notesRouter);
// server.use("/api/products/summary", summaryRouter);
server.use("/api/orders", orderRouter);
server.use("/create-payment-intent", stripeRouter);

server.get("/", (req, res) => {
  res.send("<h1>TEST API</h1>");
});

server.use(notFound);

server.listen(port, () => {
  console.log(`\n\n SERVER IS RUNNING ON PORT:${port} \n\n`);
});
