import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addCartItem } from "../../redux/actions/cart.actions";
import { fetchSingleNote } from "../../redux/actions/note.actions";
import image from "../../new_user.png";
import Button from "../../components/button/button.component";
import Line from "../../components/line/line.component";
import "./Single-Note-Info.styles.scss";

function SingleNoteInfo({ fetchSingleNote, note, addCartItem }) {
  const { unique_note_id } = useParams();
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

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    fetchSingleNote(unique_note_id);
  }, []);

  const addToCart = (note) => {
    addCartItem(note);
    notify();
  };

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
    subject,
  } = note;
  return (
    <div className="single-note-info-container">
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
      <div className="top-note-info-container">
        <div className="general-info-container">
          <h1>
            {note_name} | {subject}
          </h1>
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
          <img src={document || image} alt="" className="noteImage" />
          <span>$ {price}</span>
          <Button
            buttonStyle="short-ctagreen-button"
            type="submit"
            handleSubmit={(e) => addToCart(note)}
          >
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
export default connect(mapStateToProps, { fetchSingleNote, addCartItem })(
  SingleNoteInfo
);
