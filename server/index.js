require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan("short"));

const port = process.env.PORT || 4000;
const authRouter = require("./routes/authRouter");

server.use("/api/auth", authRouter);
server.get("/", (req, res) => {
  res.send("<h1>TEST API</h1>");
});
server.listen(port, () => {
  console.log(`\n\n SERVER IS RUNNING ON PORT:${port} \n\n`);
});
