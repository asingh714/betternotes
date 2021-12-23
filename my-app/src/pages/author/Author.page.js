import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { getAuthorProfile } from "../../redux/actions/user.actions";

function Author({ getAuthorProfile, user }) {
  const { unique_user_id } = useParams();

  useEffect(() => {
    getAuthorProfile(unique_user_id);
  }, []);

  const {
    user_name,
    school_name,
    user_grade_level,
    profile_image,
    user_description,
  } = user;

  return (
    <>
      <span>{user_name}</span>
      <span>{school_name}</span>
      <span>{user_grade_level}</span>
      <span>{user_description}</span>
      <span>{profile_image}</span>
    </>
  );
}

const mapStateToProps = (state) => {
  console.log(state.user.userInfo);
  return {
    user: state.user.userInfo,
  };
};
export default connect(mapStateToProps, { getAuthorProfile })(Author);
