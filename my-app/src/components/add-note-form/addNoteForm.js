import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../../new_user.png";

import FormInput from "../form-input/form-input.component";
import Dropdown from "../dropdown/dropdown.component";

import "./addNoteForm.styles.scss";
export default function AddNoteForm({}) {
  const initialState = {
    document: document.length > 0 ? "" : image,
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
    setNote((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const fileSelectedHandler = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setNote((prevState) => ({
          ...prevState,
          document: reader.result,
        }));
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  return (
    <form className="add-note-form-container">
      <div className="img-container">
        <label className="file-label">
          <span>Add Note Document</span>
          <img
            src={note.document}
            alt="note"
            // className="edit-image"
          />
          <FormInput
            name="profile_image"
            handleChange={fileSelectedHandler}
            type="file"
            // inputStyle="user-edit"
            // accept="image/*"
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
        name="user_grade_level"
        value={note.grade_level}
      />
    </form>
  );
}
