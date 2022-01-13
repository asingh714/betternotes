import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import ImpText from "../imp-text/impText.component";
import { loginUser } from "../../redux/actions/user.actions";

import { validateLogin } from "../../utils/validateForm";

import "./login-form.styles.scss";

function LoginForm({ loginUser, isLoggedIn, isLoggingIn, loggingError }) {
  const initialState = {
    username: "",
    password: "",
  };
  const [user, setUser] = useState(initialState);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (event) => {
    setUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateLogin(user.username, user.password, loggingError);
    if (Object.keys(errors).length === 0) {
      loginUser(user);
      setUser(initialState);
    } else {
      setErrors(errors);
    }
  };

  return (
    <form className="login-form-container">
      {loggingError && <ImpText textStyle="error-text">{loggingError}</ImpText>}
      {errors.username && (
        <ImpText textStyle="error-text">{errors.username}</ImpText>
      )}
      <FormInput
        name="username"
        handleChange={handleChange}
        placeholder="Username"
        type="text"
        value={user.username}
        inputStyle="user-log-reg"
      />
      {errors.password && (
        <ImpText textStyle="error-text">{errors.password}</ImpText>
      )}
      <FormInput
        name="password"
        handleChange={handleChange}
        placeholder="Password"
        type="password"
        value={user.password}
        inputStyle="user-log-reg"
      />

      {isLoggingIn ? (
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
          handleSubmit={handleSubmit}
          buttonStyle="large-bluefour-btn"
        >
          Submit
        </Button>
      )}

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
