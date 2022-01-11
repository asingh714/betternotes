import { useState } from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { loginUser } from "../../redux/actions/user.actions";

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
      />
      <FormInput
        name="password"
        handleChange={handleChange}
        placeholder="Password"
        type="password"
        value={user.password}
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

export default connect(mapStateToProps, { loginUser })(LoginForm);
