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

import "./EditProfilePageForm.styles.scss";

class EditProfilePageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_image: image,
      school_name: "",
      user_grade_level: "",
      user_description: "",
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
        this.setState({ profile_image: reader.result });
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  navigateToProfile = () => {
    this.props.navigate("/home");
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
                src={this.state.profile_image}
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
          <Button type="submit">Submit</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(withRouter(EditProfilePageForm));
