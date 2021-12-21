import { useState } from "react";
import { connect } from "react-redux";
import { useSearchParams } from "react-router-dom";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { resetForgottenPassword } from "../../redux/actions/user.actions";

function ResetPasswordForm({ resetForgottenPassword }) {
  const initialState = {
    new_password: "",
    confirm_new_password: "",
  };

  const [passwords, setPasswords] = useState(initialState);
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
    resetForgottenPassword(token, email, passwords);
    setPasswords(initialState);
  };

  return (
    <form>
      <FormInput
        name="new_password"
        handleChange={handleChange}
        placeholder="New Password"
        type="password"
        value={passwords.new_password}
      />
      <FormInput
        name="confirm_new_password"
        handleChange={handleChange}
        placeholder="Confirm Password"
        type="password"
        value={passwords.confirm_new_password}
      />
      <Button type="submit" handleSubmit={handleSubmit}>
        Submit
      </Button>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { resetForgottenPassword })(
  ResetPasswordForm
);
