import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import image from "../../logo512.png";

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

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="single-note-container">
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

        <span>{short_description}</span>

        <span>{user_name}</span>
        <div className="note-bottom-line">
          <div className="note-info-line">
            <span>{pages}</span>
            <span>{year}</span>
            <span>{school}</span>
          </div>
          <Button type="submit">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}
