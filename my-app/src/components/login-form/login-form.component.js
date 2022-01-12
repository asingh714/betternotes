import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import ImpText from "../imp-text/impText.component";
import { loginUser } from "../../redux/actions/user.actions";

import "./login-form.styles.scss";

function LoginForm({ loginUser, isLoggedIn }) {
  const initialState = {
    username: "",
    password: "",
  };

  const [user, setUser] = useState(initialState);

  const handleChange = (event) => {
    setUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(user);
    setUser(initialState);
  };

  return (
    <form className="login-form-container">
      <FormInput
        name="username"
        handleChange={handleChange}
        placeholder="Username"
        type="text"
        value={user.username}
        inputStyle="user-log-reg"
      />
      <FormInput
        name="password"
        handleChange={handleChange}
        placeholder="Password"
        type="password"
        value={user.password}
        inputStyle="user-log-reg"
      />
      <Button
        type="submit"
        handleSubmit={handleSubmit}
        buttonStyle="large-bluefour-btn"
      >
        Submit
      </Button>
      <ImpText textStyle="large-text">
        <Link to="/register">Don't have an account?</Link>
      </ImpText>
      <ImpText textStyle="small-text">
        <Link to="/forgot-password">Forgot Password?</Link>
      </ImpText>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggingIn: state.user.isLoggingIn,
    isLoggedIn: state.user.isLoggedIn,
    loggingError: state.user.loggingError,
  };
};

export default connect(mapStateToProps, { loginUser })(LoginForm);
