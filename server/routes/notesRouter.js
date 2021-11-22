const express = require("express");
const router = express.Router();
const authenticateUser = require("../util/authenticateUser");

const { createNote } = require("../controllers/notesController");

router.post("/", authenticateUser, createNote);

module.exports = router;

/* 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJuYW1lIjoiUGFibG8iLCJ1c2VybmFtZSI6InBhYmxvIiwiZW1haWwiOiJwYWJsb0BlbWFpbC5jb20iLCJpYXQiOjE2Mzc2MDQ2MjEsImV4cCI6MTY0NjI0NDYyMX0.iJGKbWGYOmWT9u0eYM7vu06SIkHTG2_TffyWQDZqw9w
*/