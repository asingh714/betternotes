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
      </div>
    );
  }
}
