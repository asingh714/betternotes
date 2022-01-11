import { Component } from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import ImpText from "../imp-text/impText.component";

import { registerUser } from "../../redux/actions/user.actions";

import "./register-form.styles.scss";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      username: "",
      password: "",
      confirm_password: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.registerUser(this.state);
  };

  render() {
    return (
      <form className="register-form-container">
        <FormInput
          name="name"
          handleChange={this.handleChange}
          placeholder="Name"
          type="text"
          value={this.state.name}
          inputStyle="user-log-reg"
        />
        <FormInput
          name="email"
          handleChange={this.handleChange}
          placeholder="Email"
          type="email"
          value={this.state.email}
          inputStyle="user-log-reg"
        />
        <FormInput
          name="username"
          handleChange={this.handleChange}
          placeholder="Username"
          type="text"
          value={this.state.username}
          inputStyle="user-log-reg"
        />
        <FormInput
          name="password"
          handleChange={this.handleChange}
          placeholder="Password"
          type="password"
          value={this.state.password}
          inputStyle="user-log-reg"
        />
        <FormInput
          name="confirm_password"
          handleChange={this.handleChange}
          placeholder="Confirm Password"
          type="password"
          value={this.state.confirm_password}
          inputStyle="user-log-reg"
        />
        <Button
          type="submit"
          handleSubmit={this.handleSubmit}
          buttonStyle="large-bluefour-btn"
        >
          Register
        </Button>
        <ImpText textStyle="large-text">Already have an account?</ImpText>
      </form>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { registerUser })(RegisterForm);
