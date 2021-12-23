import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";

import { fetchSingleNote } from "../../redux/actions/note.actions";

import Button from "../../components/button/button.component";

function SingleNoteInfo({ fetchSingleNote, note }) {
  const { unique_note_id } = useParams();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

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
  } = note;
  return (
    <>
      <span>{note_name}</span>
      <span>{short_description}</span>
      <span>Created by {user_name}</span>
      <span>
        {school} | {class_name}
      </span>
      <span>
        {teacher} | {year}
      </span>
      <Document
        file={document}
        loading="Loading IMAGE...."
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <span>{price}</span>
      <Button>Add to Cart</Button>
      <span>{long_description}</span>
      <span>About the creator</span>

      <img src={profile_image} alt="Note Creator" />
      <span>{user_description}</span>
      <span>Student at {school_name}</span>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    note: state.notes.singleNote,
  };
};
export default connect(mapStateToProps, { fetchSingleNote })(SingleNoteInfo);
