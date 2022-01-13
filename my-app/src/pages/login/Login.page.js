import LoginForm from "../../components/login-form/login-form.component";

import "./Login.styles.scss";

export default function Login(props) {
  return (
    <div className="login-page-container">
      <LoginForm {...props} />
    </div>
  );
}
