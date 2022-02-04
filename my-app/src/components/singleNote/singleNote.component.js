import React, { useState } from "react";
import { connect } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import image from "../../new_user.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

import Button from "../button/button.component";
import ImpText from "../imp-text/impText.component";
import { addCartItem, removeCartItems } from "../../redux/actions/cart.actions";

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
    subject,
  } = props.note;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();
  const notify = () =>
    toast.success("Added to the cart", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleDeleteFuncs = (event) => {
    event.stopPropagation();
    props.setNoteIdToDelete(unique_note_id);
    props.handleDeleteModal();
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    event.preventDefault();
    props.setNoteIdToEdit(unique_note_id);

  };

  const addToCart = (event, note) => {
    event.stopPropagation();
    props.addCartItem(note);
    notify();
  };

  const handleRemoveCartItem = (event, id) => {
    event.stopPropagation();
    props.removeCartItems(id);
  };

  if (props.noteStyle === "wide") {
    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <ToastContainer />
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

            <p className="subject-desc">{subject}</p>
            <p className="note-desc">{short_description}</p>

            <span className="user-name">{user_name}</span>
            <div className="note-bottom-line">
              <div className="note-info-line">
                <span>{pages} Pages </span> | <span>{year}</span> |
                <span>{school}</span>
              </div>
              <Button
                type="submit"
                buttonStyle="large-ctagreen-button"
                handleSubmit={(e) => addToCart(e, props.note)}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </>
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
          <span className="note-info-user">{props.user_name || user_name}</span>
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
          <ImpText
            textStyle="edit-text"
            handleClick={(event) => handleEdit(event)}
          >
            Edit
          </ImpText>
          <ImpText
            textStyle="delete-text"
            handleClick={(event) => handleDeleteFuncs(event)}
          >
            Delete
          </ImpText>
        </div>
      </div>
    );
  } else if (props.noteStyle === "wide-cart") {
    return (
      <div
        className="wide-note-info-container-cart"
        onClick={(event) => navigate(`/notes/${props.id}`)}
      >
        <div className="img-container">
          {/* <Document
            file={document}
            loading="Loading IMAGE...."
            onLoadSuccess={onDocumentLoadSuccess}
            className="noteImage"
          >
            <Page pageNumber={pageNumber} />
          </Document> */}
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
            <ImpText
              textStyle="small-remove-text"
              handleClick={(e) => handleRemoveCartItem(e, unique_note_id)}
            >
              Remove
            </ImpText>
            {/* <Button
              type="submit"
              buttonStyle="large-ctagreen-button"
              handleSubmit={(e) => addToCart(e, props.note)}
            >
              Add to Cart
            </Button> */}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { addCartItem, removeCartItems })(SingleNote);
