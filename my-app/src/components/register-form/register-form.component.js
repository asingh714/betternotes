import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Bars } from "react-loader-spinner";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import ImpText from "../imp-text/impText.component";
import { withRouter } from "../../utils/withRouter";

import { registerUser } from "../../redux/actions/user.actions";
import { validateRegistration } from "../../utils/validateForm";

import "./register-form.styles.scss";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      email: "",
      username: "",
      password: "",
      confirm_password: "",
      errors: {},
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isRegistered !== this.props.isRegistered) {
      // setTimeout(() => {
        this.props.navigate("/profile");
      // }, 2000);
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { user_name, email, username, password, confirm_password } =
      this.state;
    const errors = validateRegistration(
      user_name,
      email,
      username,
      password,
      confirm_password
    );
    if (Object.keys(errors).length === 0) {
      this.props.registerUser({
        user_name,
        email,
        username,
        password,
        confirm_password,
      });
      this.setState({
        user_name: "",
        email: "",
        username: "",
        password: "",
        confirm_password: "",
        errors: {},
      });
    } else {
      this.setState({
        errors,
      });
    }
  };

  render() {
    const { registrationError, isRegistering, isRegistered } = this.props;
    const { errors } = this.state;
    return (
      <form className="register-form-container">
        {registrationError && (
          <ImpText textStyle="error-text">{registrationError}</ImpText>
        )}
        {isRegistered && (
          <ImpText textStyle="large-plain-text">
            Your account has been created!
          </ImpText>
        )}
        {errors.user_name && (
          <ImpText textStyle="error-text">{errors.user_name}</ImpText>
        )}
        <FormInput
          name="user_name"
          handleChange={this.handleChange}
          placeholder="Name"
          type="text"
          value={this.state.user_name}
          inputStyle="user-log-reg"
        />
        {errors.email && (
          <ImpText textStyle="error-text">{errors.email}</ImpText>
        )}
        <FormInput
          name="email"
          handleChange={this.handleChange}
          placeholder="Email"
          type="email"
          value={this.state.email}
          inputStyle="user-log-reg"
        />
        {errors.username && (
          <ImpText textStyle="error-text">{errors.username}</ImpText>
        )}
        <FormInput
          name="username"
          handleChange={this.handleChange}
          placeholder="Username"
          type="text"
          value={this.state.username}
          inputStyle="user-log-reg"
        />
        {errors.password && (
          <ImpText textStyle="error-text">{errors.password}</ImpText>
        )}
        <FormInput
          name="password"
          handleChange={this.handleChange}
          placeholder="Password"
          type="password"
          value={this.state.password}
          inputStyle="user-log-reg"
        />
        {errors.confirm_password && (
          <ImpText textStyle="error-text">{errors.confirm_password}</ImpText>
        )}
        <FormInput
          name="confirm_password"
          handleChange={this.handleChange}
          placeholder="Confirm Password"
          type="password"
          value={this.state.confirm_password}
          inputStyle="user-log-reg"
        />
        {isRegistering ? (
          <Bars
            height="25"
            width="25"
            color="#2186eb"
            arialLabel="loading-indicator"
            wrapperClass="loading-bars"
          />
        ) : (
          <Button
            type="submit"
            handleSubmit={this.handleSubmit}
            buttonStyle="large-bluefour-btn"
          >
            Register
          </Button>
        )}
        <ImpText textStyle="large-text">
          <Link to="/login">Already have an account?</Link>
        </ImpText>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isRegistering: state.user.isRegistering,
    isRegistered: state.user.isRegistered,
    registrationError: state.user.registrationError,
  };
};

export default connect(mapStateToProps, { registerUser })(
  withRouter(RegisterForm)
);
