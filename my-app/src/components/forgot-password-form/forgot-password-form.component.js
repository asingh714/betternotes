import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";
import ImpText from "../imp-text/impText.component";
import { forgottenPasswordRequest } from "../../redux/actions/user.actions";

import "./forgot-password-form.styles.scss";
function ForgotPasswordForm({ forgottenPasswordRequest }) {
  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    forgottenPasswordRequest(email);
    setEmail("");
  };

  return (
    <form className="forgot-password-form-container">
      <FormInput
        name="email"
        handleChange={handleChange}
        placeholder="Email"
        type="email"
        value={email}
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
    </form>
  );
}

const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, { forgottenPasswordRequest })(
  ForgotPasswordForm
);
