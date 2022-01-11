import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";

import { fetchSingleNote } from "../../redux/actions/note.actions";
import image from "../../logo512.png";
import Button from "../../components/button/button.component";
import Line from "../../components/line/line.component";
import "./Single-Note-Info.styles.scss";

function SingleNoteInfo({ fetchSingleNote, note }) {
  const { unique_note_id } = useParams();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  let navigate = useNavigate();

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    fetchSingleNote(unique_note_id);
  }, []);

  const {
    note_name,
    short_description,
    long_description,
    user_name,
    school,
    class_name,
    teacher,
    year,
    price,
    document,
    profile_image,
    user_description,
    school_name,
    unique_user_id,
    user_id,
  } = note;
  return (
    <div className="single-note-info-container">
      <div className="top-note-info-container">
        <div className="general-info-container">
          <h1>{note_name}</h1>
          <p>{short_description}</p>
          <span className="username-info">
            Created by <span>{user_name}</span>
          </span>
          <span className="school-info">
            {school} | {class_name}
          </span>
          <span className="teacher-info">
            {teacher} | {year}
          </span>
        </div>
        {/* <Document
        file={document}
        loading="Loading IMAGE...."
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document> */}
        <div className="image-cta-container">
          <img src={image} alt="" className="noteImage" />
          <span>$ {price}</span>
          <Button buttonStyle="short-ctagreen-button" type="submit">
            Add to Cart
          </Button>
        </div>
      </div>
      <p className="long-note-info">{long_description}</p>

      <Line classname="long-line" />

      <div className="about-container">
        <h2>About the creator</h2>
        <div className="author-container">
          <img src={profile_image || image} alt="Note Creator" />
          <div className="written-author-container">
            <h3
              onClick={(event) =>
                navigate(`/user/${unique_user_id}/notes/${user_id}`)
              }
            >
              {user_name}
            </h3>
            <p>{user_description}</p>
            <span>Student at {school_name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    note: state.notes.singleNote,
  };
};
export default connect(mapStateToProps, { fetchSingleNote })(SingleNoteInfo);
