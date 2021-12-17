import { Component } from "react";

import FormInput from "../form-input/form-input.component";

export default class RegisterForm extends Component {
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

  render() {
    return (
      <div>
        <FormInput
          name="name"
          handleChange={this.handleChange}
          placeHolder="Name"
          type="text"
          value={this.state.name}
        />
        <FormInput
          name="email"
          handleChange={this.handleChange}
          placeHolder="Email"
          type="email"
          value={this.state.email}
        />
        <FormInput
          name="username"
          handleChange={this.handleChange}
          placeHolder="Username"
          type="text"
          value={this.state.username}
        />
        <FormInput
          name="password"
          handleChange={this.handleChange}
          placeHolder="Password"
          type="password"
          value={this.state.password}
        />
        <FormInput
          name="confirm_password"
          handleChange={this.handleChange}
          placeHolder="Confirm Password"
          type="password"
          value={this.state.confirm_password}
        />
      </div>
    );
  }
}
