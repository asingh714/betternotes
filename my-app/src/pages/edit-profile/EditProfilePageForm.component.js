import React, { Component } from "react";
import { connect } from "react-redux";
import { IconContext } from "react-icons";
import { BiLeftArrow } from "react-icons/bi";

import image from "../../new_user.png";
import FormInput from "../../components/form-input/form-input.component";
import Dropdown from "../../components/dropdown/dropdown.component";
import Button from "../../components/button/button.component";
import ImpText from "../../components/imp-text/impText.component";
import { withRouter } from "../../utils/withRouter";
import {
  updateUserProfile,
  fetchOwnProfileData,
} from "../../redux/actions/user.actions";

import "./EditProfilePageForm.styles.scss";

class EditProfilePageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_image: this.props.user.profile_image || image,
      profile_image: this.props.user.profile_image || image,
      school_name: this.props.user.school_name || "",
      user_grade_level: this.props.user.user_grade_level || "",
      user_description: this.props.user.user_description || "",
    };
  }
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  fileSelectedHandler = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({
          display_image: reader.result,
          profile_image: event.target.files[0],
        });
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  handleUpdateUser = (event) => {
    event.preventDefault();
    let formData = new FormData();
    const { profile_image, school_name, user_grade_level, user_description } =
      this.state;

    formData.append("profile_image", profile_image);
    formData.append("school_name", school_name);
    formData.append("user_grade_level", user_grade_level);
    formData.append("user_description", user_description);

    this.props.updateUserProfile(formData, this.props.user["unique_user_id"]);
    this.props.navigate("/profile");
  };

  navigateToProfile = () => {
    this.props.navigate("/profile");
  };
  render() {
    return (
      <div className="edit-profile-page-container">
        <ImpText
          textStyle="small-back-text"
          handleClick={() => this.props.navigate("/profile")}
        >
          <IconContext.Provider
            value={{
              style: { verticalAlign: "middle", marginRight: "5px" },
            }}
          >
            <BiLeftArrow />
            Back
          </IconContext.Provider>
        </ImpText>

        <form className="edit-profile-form-container">
          <div className="img-container">
            <label className="file-label">
              <span>Update Image</span>
              <img
                src={this.state.display_image}
                alt="profile"
                className="edit-image"
              />
              <FormInput
                name="profile_image"
                handleChange={this.fileSelectedHandler}
                type="file"
                inputStyle="user-edit"
                accept="image/*"
              />
            </label>
          </div>

          <FormInput
            name="school_name"
            handleChange={this.handleInputChange}
            placeholder="School Name"
            type="text"
            value={this.state.school_name}
            inputStyle="user-edit"
          />
          <Dropdown
            dropdownStyle="user-edit"
            label="Grade Level"
            onChange={this.handleInputChange}
            options={["Grade 9", "Grade 10", "Grade 11", "Grade 12", "College"]}
            name="user_grade_level"
            value={this.state.user_grade_level}
          />
          <textarea
            name="user_description"
            onChange={this.handleInputChange}
            placeholder="Tell us about yourself"
            type="text"
            value={this.state.user_description}
            className="user-edit"
          ></textarea>
          <Button
            handleSubmit={this.handleUpdateUser}
            type="submit"
            buttonStyle="large-bluefour-btn"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.profileData,
  };
};

export default connect(mapStateToProps, {
  updateUserProfile,
  fetchOwnProfileData,
})(withRouter(EditProfilePageForm));
