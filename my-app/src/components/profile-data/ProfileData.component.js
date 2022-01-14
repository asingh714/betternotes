import { Component } from "react";
import { connect } from "react-redux";

import Button from "../button/button.component";

import { fetchOwnProfileData } from "../../redux/actions/user.actions";

import "./ProfileData.styles.scss";

class ProfileData extends Component {
  componentDidMount() {
    this.props.fetchOwnProfileData();
  }
  render() {
    const {
      profile_image,
      user_name,
      email,
      school_name,
      user_description,
      user_grade_level,
      username,
    } = this.props.user;
    return (
      <div className="profile-data-container">
        <img
          src={profile_image}
          alt={`Profile for ${user_name}`}
          height="250px"
          width="250px"
          className="profile-image"
        />
        <div className="profile-written-container">
          <div className="profile-top-written-container">
            <span>
              {user_name} | {username}
            </span>
            <span>{email} </span>
            <span>
              {user_grade_level} @ {school_name}
            </span>
          </div>
          <p>{user_description}</p>
        </div>
        <div className="button-container">
          <span>Change Password</span>
          <Button buttonStyle="large-bluefour-btn">Edit Profile</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.profileData,
  };
};

export default connect(mapStateToProps, { fetchOwnProfileData })(ProfileData);
