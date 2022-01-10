import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import image from "../../logo512.png";

import { useNavigate } from "react-router-dom";

import Button from "../button/button.component";

import "./singleNote.styles.scss";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function SingleNote(props) {
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
  let navigate = useNavigate();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div
      className={
        props.noteStyle === "wide"
          ? "wide-note-info-container"
          : "narrow-note-info-container"
      }
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
        <img src={image} alt="" className="noteImage" />
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
          <Button type="submit" buttonStyle="note-button">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
