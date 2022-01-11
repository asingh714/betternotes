import Button from "../button/button.component";
import "./header.styles.scss";

export default function Header() {
  return (
    <header className="full-header-container">
      <p>LOGO</p>
      <p>Cart</p>
      <Button>Log In</Button>
      <Button>Sign Up</Button>
      <p>Profile</p>
    </header>
  );
}
