import { useState } from "react";
import { connect } from "react-redux";

import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";

function ForgotPassword({}) {
  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    setEmail((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // loginUser(user);
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

export default connect(mapStateToProps, {})(ForgotPassword);
