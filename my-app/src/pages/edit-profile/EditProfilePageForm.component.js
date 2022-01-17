import React, { Component } from "react";
import { connect } from "react-redux";
import { IconContext } from "react-icons";
import { BiLeftArrow } from "react-icons/bi";

import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";
import ImpText from "../../components/imp-text/impText.component";
import { withRouter } from "../../utils/withRouter";

import "./EditProfilePageForm.styles.scss";

class ProfilePageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      school_name: "",
      user_grade_level: "",
      user_description: "",
      profile_image: "",
    };
  }
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  navigateToProfile = () => {
    this.props.navigate("/home");
  };
  render() {
    return (
      <div className="profile-page-form-container">
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
        <form>
          <FormInput
            name="user_name"
            handleChange={this.handleInputChange}
            placeholder="Name"
            type="text"
            value={this.state.user_name}
          />
          <FormInput
            name="school_name"
            handleChange={this.handleInputChange}
            placeholder="School Name"
            type="text"
            value={this.state.school_name}
          />
          <FormInput
            name="user_grade_level"
            handleChange={this.handleInputChange}
            placeholder="Grade Level"
            type="text"
            value={this.state.user_grade_level}
          />
          <FormInput
            name="user_description"
            handleChange={this.handleInputChange}
            placeholder="Tell us about yourself"
            type="text"
            value={this.state.user_description}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    );
  }
}
// update the user via form but use this page to show profiles
const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(withRouter(ProfilePageForm));
