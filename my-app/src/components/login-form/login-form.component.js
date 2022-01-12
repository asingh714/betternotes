import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import ImpText from "../imp-text/impText.component";
import { loginUser } from "../../redux/actions/user.actions";

import "./login-form.styles.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function LoginForm({ loginUser, isLoggedIn, isLoggingIn }) {
  const initialState = {
    username: "",
    password: "",
  };
  const navigate = useNavigate();
  const [user, setUser] = useState(initialState);

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
