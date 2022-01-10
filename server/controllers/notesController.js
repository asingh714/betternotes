const db = require("../db/dbConfig");
const { v4: uuidv4 } = require("uuid");
const { cloudinary } = require("../util/cloudConfig");

const createNote = async (req, res) => {
  const {
    note_name,
    short_description,
    long_description,
    price,
    pages,
    year,
    language,
    subject,
    school,
    grade_level,
    class_name,
    teacher,
  } = req.body;
  const subject_token = req.decodedToken.subject;
  const validationErrors = [];

  if (
    !note_name ||
    !short_description ||
    !long_description ||
    !language ||
    !pages ||
    !year ||
    !subject ||
    !school ||
    !grade_level ||
    !class_name ||
    !teacher ||
    !price
  ) {
    validationErrors.push({
      code: "VALIDATION_ERROR",
      field: "ALL",
      message: "Some of these fields are missing.",
    });
  }
  if (validationErrors.length) {
    const errorObject = {
      error: true,
      errors: validationErrors,
    };
    res.status(400).send(errorObject);
  } else {
    if (req.file) {
      const uniqueId = uuidv4();

      const result = await cloudinary.uploader.upload(req.file.path);
      const newProduct = {
        unique_note_id: uniqueId,
        note_name,
        short_description,
        long_description,
        document: result.url,
        created_date: Date.now(),
        price,
        pages,
        year,
        language,
        subject,
        school,
        grade_level,
        class_name,
        teacher,
        user_id: subject_token,
      };

      db("notes")
        .insert(newProduct)
        .then((result) => {
          res.status(201).json({
            result,
            message: "New note has been created.",
          });
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    } else {
      res.status(500).json({
        message: "We had an error creating your note.",
      });
    }
  }
};

const getAllNotes = (req, res) => {
  db("notes")
    .join("users", "notes.user_id", "users.id")
    .select(
      "notes.id",
      "unique_note_id",
      "note_name",
      "short_description",
      "long_description",
      "document",
      "created_date",
      "price",
      "pages",
      "year",
      "language",
      "subject",
      "school",
      "grade_level",
      "user_grade_level",
      "class_name",
      "teacher",
      "user_name",
      "email",
      "username",
      "profile_image",
      "user_id"
    )
    .then((result) => {
      if (result.length < 1) {
        res.status(404).json({ error: "There are no notes" });
      } else {
        res.status(200).json(result);
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

const getAllUserNotes = (req, res) => {
  const subject_token = req.decodedToken.subject;
  db("notes")
    .where({ user_id: subject_token })
    .then((result) => {
      if (result.length < 1) {
        res.status(404).json({ error: "There are no notes" });
      } else {
        res.status(200).json(result);
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

const getSingleNote = (req, res) => {
  const { unique_note_id } = req.params;

  db("notes")
    .where({ unique_note_id })
    .join("users", "notes.user_id", "users.id")
    .select(
      "notes.id",
      "unique_note_id",
      "note_name",
      "short_description",
      "long_description",
      "document",
      "created_date",
      "price",
      "pages",
      "year",
      "language",
      "subject",
      "school",
      "user_grade_level",
      "class_name",
      "teacher",
      "user_name",
      "email",
      "username",
      "profile_image",
      "school_name",
      "user_description",
      "unique_user_id",
      "users.id as user_id"
    )
    .first()
    .then((singleNote) => {
      // console.log(singleNote);
      if (singleNote.length < 1) {
        res.status(404).json({
          error: "You cannot access the note with this specific key",
        });
      } else {
        res.status(200).json(singleNote);
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: "The note with this specific ID could not be retrieved.",
      });
    });
};

const updateNote = (req, res) => {
  const { unique_note_id } = req.params;

  const {
    note_name,
    short_description,
    long_description,
    document,
    price,
    pages,
    year,
    language,
    subject,
    school,
    grade_level,
    class_name,
    teacher,
  } = req.body;

  // const subject_token = req.decodedToken.subject;
  const validationErrors = [];

  if (
    !note_name ||
    !short_description ||
    !long_description ||
    // !document ||
    !language ||
    !pages ||
    !year ||
    !subject ||
    !school ||
    !grade_level ||
    !class_name ||
    !teacher ||
    !price
  ) {
    validationErrors.push({
      code: "VALIDATION_ERROR",
      field: "ALL",
      message: "Some of these fields are missing.",
    });
  }

  if (validationErrors.length) {
    const errorObject = {
      error: true,
      errors: validationErrors,
    };
    res.status(400).send(errorObject);
  } else {
    db("notes")
      .where({ unique_note_id })
      .first()
      .then((result) => {
        if (!result) {
          res.status(404).json({
            error: "You cannot access the note with this specific key",
          });
        } else {
          db("notes")
            .where({ unique_note_id })
            .first()
            .update({
              note_name,
              short_description,
              long_description,
              document,
              price,
              pages,
              year,
              language,
              subject,
              school,
              grade_level,
              class_name,
              teacher,
            })
            .then((result) => {
              console.log(result);
              res.status(201).json(result);
            })
            .catch((error) => {
              res.status(500).json({
                error: "This note could not be retrieved.",
              });
            });
        }
      })
      .catch((error) => {
        res.status(500).json({
          error: "This product could not be retrieved.",
        });
      });
  }
};

const deleteNote = (req, res) => {
  const { unique_note_id } = req.params;

  db("notes")
    .where({ unique_note_id })
    .first()
    .then((product) => {
      if (product) {
        db("notes")
          .where({ unique_note_id })
          .del()
          // db("notes")
          //   .where({ note_key })
          //   .del()
          .then((count) => res.status(200).json(count));
      } else {
        res.status(404).json({
          error: "You cannot access the note with this specific id.",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "This product could not be removed" });
    });
};

module.exports = {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
  getAllUserNotes,
};
