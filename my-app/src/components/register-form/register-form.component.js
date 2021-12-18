import { Component } from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { registerUser } from "../../redux/actions/user.actions";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      username: "",
      password: "",
      confirm_password: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.registerUser(this.state);
  };

  render() {
    return (
      <form>
        <FormInput
          name="name"
          handleChange={this.handleChange}
          placeholder="Name"
          type="text"
          value={this.state.name}
        />
        <FormInput
          name="email"
          handleChange={this.handleChange}
          placeholder="Email"
          type="email"
          value={this.state.email}
        />
        <FormInput
          name="username"
          handleChange={this.handleChange}
          placeholder="Username"
          type="text"
          value={this.state.username}
        />
        <FormInput
          name="password"
          handleChange={this.handleChange}
          placeholder="Password"
          type="password"
          value={this.state.password}
        />
        <FormInput
          name="confirm_password"
          handleChange={this.handleChange}
          placeholder="Confirm Password"
          type="password"
          value={this.state.confirm_password}
        />
        <Button type="submit" handleSubmit={this.handleSubmit}>
          Register
        </Button>
      </form>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { registerUser })(RegisterForm);
