import { useNavigate } from "react-router-dom";

import "./footer.styles.scss";
export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="footer-container">
      <span onClick={() => navigate("/")} className="logo">
        BETTER NOTE
      </span>
      <p className="copyright">Copyright © 2022 Better Note</p>
    </footer>
  );
}
