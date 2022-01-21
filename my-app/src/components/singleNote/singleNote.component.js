import React, { useState } from "react";
import { connect } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import image from "../../new_user.png";
import { deleteNote } from "../../redux/actions/note.actions";

import { useNavigate } from "react-router-dom";

import Button from "../button/button.component";
import ImpText from "../imp-text/impText.component";

import "./singleNote.styles.scss";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function SingleNote(props) {
  const {
    document,
    class_name,
    short_description,
    price,
    user_name,
    pages,
    year,
    school,
    unique_note_id,
  } = props.note;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function handleDelete(event) {
    event.preventDefault();
    props.deleteNote(unique_note_id);
    // console.log(unique_note_id);
  }

  if (props.noteStyle === "wide") {
    return (
      <div
        className="wide-note-info-container"
        onClick={(event) => navigate(`/notes/${props.id}`)}
      >
        {/* <Document
          file={document}
        loading="Loading IMAGE...."
        onLoadSuccess={onDocumentLoadSuccess}
        className="noteImage"
        >
        <Page pageNumber={pageNumber} />
      </Document> */}
        <div className="img-container">
          <img src={document} alt="note" className="noteImage" />
        </div>

        <div className="note-info-container">
          <div className="note-top-line">
            <span>{class_name}</span>
            <span>${price}</span>
          </div>

          <p className="note-desc">{short_description}</p>

          <span className="user-name">{user_name}</span>
          <div className="note-bottom-line">
            <div className="note-info-line">
              <span>{pages} Pages </span> | <span>{year}</span> |{" "}
              <span>{school}</span>
            </div>
            <Button type="submit" buttonStyle="large-ctagreen-button">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    );
  } else if (props.noteStyle === "narrow") {
    return (
      <div
        className="narrow-note-info-container"
        onClick={(event) => navigate(`/notes/${props.id}`)}
      >
        <div className="img-container">
          <img src={document} alt="" className="noteImage" />
        </div>
        <div className="note-info-container">
          <span className="note-info-class">{class_name}</span>
          <span className="note-info-user">{props.user_name}</span>
          <span className="note-info-price">${price}</span>
        </div>
      </div>
    );
  } else if (props.noteStyle === "forSale") {
    return (
      <div
        className="forSale-note-info-container"
        onClick={(event) => navigate(`/notes/${props.id}`)}
      >
        <div className="img-container">
          <img src={document} alt="" className="noteImage" />
        </div>
        <div className="note-info-container">
          <span className="note-info-class">{class_name}</span>
          <span className="note-info-user">{props.user_name}</span>
          <span className="note-info-price">${price}</span>
        </div>
        <div className="button-row-container">
          <ImpText textStyle="edit-text">Edit</ImpText>
          <ImpText textStyle="delete-text" handleClick={handleDelete}>
            Delete
          </ImpText>
        </div>
      </div>
    );
  }
}

export default connect(null, { deleteNote })(SingleNote);
