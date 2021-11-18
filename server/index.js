require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan("tiny"));

const port = process.env.PORT || 4000;
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");

const notFound = require("./middleware/notFound");

server.use("/api/auth", authRouter);
server.use("/api/user", userRouter);

server.get("/", (req, res) => {
  res.send("<h1>TEST API</h1>");
});

server.use(notFound);

server.listen(port, () => {
  console.log(`\n\n SERVER IS RUNNING ON PORT:${port} \n\n`);
});
