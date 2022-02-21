import { Component } from "react";
import { connect } from "react-redux";

import image from "../../new_user.png";
import Modal from "../modal/modal.component";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  fetchOwnProfileData,
  changePassword,
} from "../../redux/actions/user.actions";

import "./ProfileData.styles.scss";

class ProfileData extends Component {
  state = {
    showModal: false,
    password: "",
    new_password: "",
    confirm_new_password: "",
  };

  componentDidMount() {
    this.props.fetchOwnProfileData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.hasUpdatedProfileData !== this.props.hasUpdatedProfileData) {
      this.props.fetchOwnProfileData();
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { password, new_password, confirm_new_password } = this.state;
    // console.log(this.user)
    this.props.changePassword(
      this.props.user.unique_user_id,
      password,
      new_password,
      confirm_new_password
    );
  };

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
          src={profile_image || image}
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
            {user_grade_level && school_name && (
              <span>
                {user_grade_level} @ {school_name}
              </span>
            )}
          </div>
          {user_description && <p>{user_description}</p>}
        </div>
        <div className="button-container">
          <span
            onClick={(event) =>
              this.setState({ showModal: !this.state.showModal })
            }
            className="change-pw-link"
          >
            Change Password
          </span>
          <Button
            buttonStyle="large-bluefour-btn"
            handleSubmit={this.props.showProfilePageForm}
          >
            Edit Profile
          </Button>
        </div>

        {this.state.showModal && (
          <div className="new-password-container">
            <Modal modalStyle="modal-container">
              <FormInput
                name="password"
                handleChange={this.handleChange}
                placeholder="Old Password"
                type="password"
                value={this.state.password}
                inputStyle="user-log-reg"
              />
              <FormInput
                name="new_password"
                handleChange={this.handleChange}
                placeholder="New Password"
                type="password"
                value={this.state.new_password}
                inputStyle="user-log-reg"
              />
              <FormInput
                name="confirm_new_password"
                handleChange={this.handleChange}
                placeholder="Confirm New Password"
                type="password"
                value={this.state.confirm_new_password}
                inputStyle="user-log-reg"
              />
              <Button
                type="submit"
                handleSubmit={this.handleSubmit}
                buttonStyle="large-bluefour-btn"
              >
                Submit
              </Button>
              <span
                onClick={(event) =>
                  this.setState({ showModal: !this.state.showModal })
                }
                className="change-pw-link align-text"
              >
                Cancel
              </span>
            </Modal>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.profileData,
    hasUpdatedProfileData: state.user.hasUpdatedProfileData,
  };
};

export default connect(mapStateToProps, {
  fetchOwnProfileData,
  changePassword,
})(ProfileData);
