import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import Button from "../../components/button/button.component";
import ImpText from "../imp-text/impText.component";
import { verifyUser } from "../../redux/actions/user.actions";

import "./verify-user-form.styles.scss";

function VerifyUserForm({ verifyUser, ifVerified }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (ifVerified) {
      navigate("/login");
    }
  }, [ifVerified, navigate]);

  const handleSubmit = (event) => {
    verifyUser(email, token);
  };

  return (
    <div className="verify-form-container">
      <ImpText textStyle="large-plain-text">Email: {email}</ImpText>
      <Button
        type="submit"
        handleSubmit={handleSubmit}
        buttonStyle="large-bluefour-btn"
      >
        Click to Verify
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ifVerified: state.user.ifVerified,
  };
};

export default connect(mapStateToProps, { verifyUser })(VerifyUserForm);
