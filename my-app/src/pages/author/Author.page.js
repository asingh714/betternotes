import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import Notes from "../../components/notes/notes.component";

import {
  getAuthorProfile,
  fetchNotesBySingleUser,
} from "../../redux/actions/user.actions";

import "./Author.styles.scss";

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
    <div className="author-page-container">
      <h2>{user_name}</h2>
      <span>
        <span>{school_name}</span> |<span>{user_grade_level}</span>
      </span>
      <img src={profile_image} alt="" className="authorImage" />
      <p>{user_description}</p>
      <h4>My Work</h4>
      <Notes notes={userNotes} />
    </div>
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
