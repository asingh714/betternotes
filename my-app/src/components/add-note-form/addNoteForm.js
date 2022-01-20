import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../../new_user.png";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import Dropdown from "../dropdown/dropdown.component";
import { createNote } from "../../redux/actions/note.actions";

import "./addNoteForm.styles.scss";
function AddNoteForm({ createNote }) {
  const initialState = {
    displayDoc: "" || image,
    document: "" || image,
    note_name: "",
    grade_level: "",
    class_name: "",
    teacher: "",
    subject: "",
    school: "",
    year: "",
    language: "",
    price: 0,
    pages: "",
    short_description: "",
    long_description: "",
  };
  const [note, setNote] = useState(initialState);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    if (event.target.name === "price") {
      setNote((prevState) => ({
        ...prevState,
        price: parseInt(event.target.value),
      }));
    } else {
      setNote((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    }
  };
  const fileSelectedHandler = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setNote((prevState) => ({
          ...prevState,
          displayDoc: reader.result,
          document: event.target.files[0],
        }));
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("document", note.document);
    formData.append("note_name", note.note_name);
    formData.append("grade_level", note.grade_level);
    formData.append("class_name", note.class_name);
    formData.append("teacher", note.teacher);
    formData.append("subject", note.subject);
    formData.append("school", note.school);
    formData.append("year", note.year);
    formData.append("language", note.language);
    formData.append("price", note.price);
    formData.append("pages", note.pages);
    formData.append("short_description", note.short_description);
    formData.append("long_description", note.long_description);
    createNote(formData);
  };

  return (
    <form className="add-note-form-container">
      <div className="img-container">
        <label className="file-label">
          <span>Add Note Document</span>
          <img
            src={note.displayDoc}
            alt="note"
            // className="edit-image"
          />
          <FormInput
            name="document"
            handleChange={fileSelectedHandler}
            type="file"
            // inputStyle="user-edit"
            accept="image/*"
          />
        </label>
      </div>
      <FormInput
        name="note_name"
        handleChange={handleInputChange}
        placeholder="Note Name"
        type="text"
        value={note.note_name}
        inputStyle="user-edit"
      />
      <Dropdown
        dropdownStyle="user-edit"
        label="Grade Level"
        onChange={handleInputChange}
        options={["Grade 9", "Grade 10", "Grade 11", "Grade 12", "College"]}
        name="grade_level"
        value={note.grade_level}
      />
      <FormInput
        name="class_name"
        handleChange={handleInputChange}
        placeholder="Class Name"
        type="text"
        value={note.class_name}
        inputStyle="user-edit"
      />
      <FormInput
        name="teacher"
        handleChange={handleInputChange}
        placeholder="Teacher"
        type="text"
        value={note.teacher}
        inputStyle="user-edit"
      />
      <FormInput
        name="subject"
        handleChange={handleInputChange}
        placeholder="Subject"
        type="text"
        value={note.subject}
        inputStyle="user-edit"
      />
      <FormInput
        name="school"
        handleChange={handleInputChange}
        placeholder="School"
        type="text"
        value={note.school}
        inputStyle="user-edit"
      />
      <FormInput
        name="year"
        handleChange={handleInputChange}
        placeholder="Year"
        type="text"
        value={note.year}
        inputStyle="user-edit"
      />
      <FormInput
        name="language"
        handleChange={handleInputChange}
        placeholder="Language"
        type="text"
        value={note.language}
        inputStyle="user-edit"
      />
      <FormInput
        name="price"
        handleChange={handleInputChange}
        placeholder="Price"
        type="number"
        value={note.price}
        inputStyle="user-edit"
      />
      <FormInput
        name="pages"
        handleChange={handleInputChange}
        placeholder="Pages"
        type="text"
        value={note.pages}
        inputStyle="user-edit"
      />
      <textarea
        name="short_description"
        onChange={handleInputChange}
        placeholder="Short Description"
        type="text"
        value={note.short_description}
        className="user-edit"
      ></textarea>
      <textarea
        name="long_description"
        onChange={handleInputChange}
        placeholder="Long Description"
        type="text"
        value={note.long_description}
        className="user-edit"
      ></textarea>
      <Button
        handleSubmit={handleSubmit}
        type="submit"
        buttonStyle="large-bluefour-btn"
      >
        Submit
      </Button>
    </form>
  );
}

export default connect(null, { createNote })(AddNoteForm);
