const db = require("../db/dbConfig");

const createNote = (req, res) => {
  const {
    product_name,
    short_description,
    long_description,
    document,
    language,
    school,
    grade_level,
    class_name,
    teacher
  } = req.body;

  console.log(product_name)
};

module.exports = {
  createNote,
};
