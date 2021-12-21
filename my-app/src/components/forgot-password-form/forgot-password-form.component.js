import { useState } from "react";
import { connect } from "react-redux";

import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";
import { forgottenPasswordRequest } from "../../redux/actions/user.actions";

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
    <form>
      <FormInput
        name="email"
        handleChange={handleChange}
        placeholder="Email"
        type="email"
        value={email}
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
export default connect(mapStateToProps, { forgottenPasswordRequest })(
  ForgotPasswordForm
);
