import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

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
    <div>
      <Document
        file={document}
        loading="Loading IMAGE...."
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <span>{class_name}</span>
      <span>{short_description}</span>
      <span>{price}</span>
      <span>{user_name}</span>
      <span>{pages}</span>
      <span>{year}</span>
      <span>{school}</span>
    </div>
  );
}
