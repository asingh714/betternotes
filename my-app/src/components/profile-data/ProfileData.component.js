import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchOwnProfileData } from "../../redux/actions/user.actions";

class ProfileData extends Component {
  componentDidMount() {
    this.props.fetchOwnProfileData();
  }
  render() {
    const {
      profile_image,
      user_name,
      school_name,
      user_description,
      user_grade_level,
      username,
    } = this.props.user;
    return (
      <>
        <img
          src={profile_image}
          alt={`Profile for ${user_name}`}
          height="250px"
          width="250px"
        />
        <span>{user_name}</span>
        <span>{username}</span>
        <span>{school_name}</span>
        <span>{user_grade_level}</span>
        <p>{user_description}</p>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.profileData,
  };
};

export default connect(mapStateToProps, { fetchOwnProfileData })(ProfileData);
