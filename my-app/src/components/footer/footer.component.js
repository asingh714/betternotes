import { useNavigate } from "react-router-dom";

import "./footer.styles.scss";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="footer-container">
      <div className="footer-container-content">
        <span onClick={() => navigate("/")} className="logo">
          BETTER NOTE
        </span>
        <p className="copyright">Copyright © 2022 Better Note</p>
      </div>
    </footer>
  );
}
