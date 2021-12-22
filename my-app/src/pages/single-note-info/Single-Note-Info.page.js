import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchSingleNote } from "../../redux/actions/note.actions";

function SingleNoteInfo({ fetchSingleNote, note }) {
  const { unique_note_id } = useParams();

  useEffect(() => {
    fetchSingleNote(unique_note_id);
  }, []);
  const { note_name, short_description, user_name, school, class_name, teacher, year, price,  } = note;
  return (
    <>
      <span>{note_name}</span>
      <span>{short_description}</span>
      <span>Created by {user_name}</span>
      <span>{school}</span>
      <span>{class_name}</span>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    note: state.notes.singleNote,
  };
};
export default connect(mapStateToProps, { fetchSingleNote })(SingleNoteInfo);
