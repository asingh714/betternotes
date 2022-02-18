require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
// const { corsOptionsDelegate } = require("./util/corsConfig");

const server = express();
server.use(helmet());

var corsUrl;
if (process.env.DB_ENV === "development") {
  corsUrl = process.env.LOCAL_URL;
} else if (process.env.DB_ENV === "production") {
  corsUrl = process.env.DEPLOY_URL;
}

server.use(
  cors({
    origin: corsUrl,
    credentials: true,
    optionSuccessStatus: 200,
  })
);

server.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", corsUrl);
  next();
});

server.use(express.static("public"));
server.use(express.json());
server.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

server.use(morgan("short"));

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
