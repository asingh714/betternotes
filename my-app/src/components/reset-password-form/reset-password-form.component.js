import { useState } from "react";
import { connect } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Bars } from "react-loader-spinner";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import ImpText from "../imp-text/impText.component";
import { resetForgottenPassword } from "../../redux/actions/user.actions";
import { validateForgotPassword } from "../../utils/validateForm";
import "./reset-password-form.styles.scss";

function ResetPasswordForm({
  resetForgottenPassword,
  resetPasswordError,
  isResettingPassword,
}) {
  const initialState = {
    new_password: "",
    confirm_new_password: "",
  };

  const [passwords, setPasswords] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const handleChange = (event) => {
    setPasswords((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForgotPassword(
      passwords.new_password,
      passwords.confirm_new_password
    );
    if (Object.keys(errors).length === 0) {
      resetForgottenPassword(token, email, passwords);
      setPasswords(initialState);
    } else {
      setErrors(errors);
    }
  };

  return (
    <form className="reset-password-form-container">
      {resetPasswordError && (
        <ImpText textStyle="error-text">{resetPasswordError}</ImpText>
      )}
      {errors.password && (
        <ImpText textStyle="error-text">{errors.password}</ImpText>
      )}
      <FormInput
        name="new_password"
        handleChange={handleChange}
        placeholder="New Password"
        type="password"
        value={passwords.new_password}
        inputStyle="user-log-reg"
      />
      {errors.confirm_password && (
        <ImpText textStyle="error-text">{errors.confirm_password}</ImpText>
      )}
      <FormInput
        name="confirm_new_password"
        handleChange={handleChange}
        placeholder="Confirm New Password"
        type="password"
        value={passwords.confirm_new_password}
        inputStyle="user-log-reg"
      />
      {isResettingPassword ? (
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
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    isResettingPassword: state.user.isResettingPassword,
    resetPasswordError: state.user.resetPasswordError,
  };
};

export default connect(mapStateToProps, { resetForgottenPassword })(
  ResetPasswordForm
);
