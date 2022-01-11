import { useState } from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import ImpText from "../imp-text/impText.component";
import { loginUser } from "../../redux/actions/user.actions";

import "./login-form.styles.scss";

function LoginForm({ loginUser }) {
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
      <ImpText textStyle="large-text">Don't have an account?</ImpText>
      <ImpText textStyle="small-text">Forgot Password?</ImpText>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { loginUser })(LoginForm);
