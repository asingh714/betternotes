import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import {
  getAuthorProfile,
  fetchNotesBySingleUser,
} from "../../redux/actions/user.actions";

function Author({
  getAuthorProfile,
  userInfo,
  userNotes,
  fetchNotesBySingleUser,
}) {
  const { unique_user_id, user_id } = useParams();

  useEffect(() => {
    getAuthorProfile(unique_user_id);
    fetchNotesBySingleUser(unique_user_id, user_id);
  }, []);

  const {
    user_name,
    school_name,
    user_grade_level,
    profile_image,
    user_description,
  } = userInfo;

  return (
    <>
      <span>{user_name}</span>
      <span>{school_name}</span>
      <span>{user_grade_level}</span>
      <span>{user_description}</span>
      <span>{profile_image}</span>

      {userNotes.map((note) => (
        <div key={note.id}>
          <span>{note.class_name}</span>
        </div>
      ))}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    userNotes: state.user.userNotes,
  };
};
export default connect(mapStateToProps, {
  getAuthorProfile,
  fetchNotesBySingleUser,
})(Author);
