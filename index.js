require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
// const { corsOptions } = require("./util/corsConfig");

const server = express();
server.use(
  cors({
    origin: "https://betternote.netlify.app",
    credentials: true,
  })
);
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
