import { useNavigate } from "react-router-dom";

import Button from "../button/button.component";
import "./header.styles.scss";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="full-header-container">
      <span onClick={() => navigate("/home")} className="logo">
        BETTER NOTE
      </span>
      <div className="right-header-container">
        <span>Cart</span>
        <Button buttonStyle="small-plain-btn">Log In</Button>
        <Button buttonStyle="small-bluesix-btn">Sign Up</Button>
        {/* <span>Profile</span> */}
      </div>
    </header>
  );
}
