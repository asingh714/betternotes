import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import RegisterForm from "../../components/register-form/register-form.component";
import Modal from "../../components/modal/modal.component";
import ImpText from "../../components/imp-text/impText.component";

import "./Register.styles.scss";
function Register({ isRegistered }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isRegistered) {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [isRegistered, navigate]);

  return (
    <div className="register-page-container">
      {isRegistered ? (
        <Modal modalStyle="modal-container">
          <ImpText textStyle="large-plain-text">
            Your account has been created!
          </ImpText>
          <ImpText textStyle="large-plain-text">
            Please sign in via the login page!
          </ImpText>
        </Modal>
      ) : (
        <RegisterForm />
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    isRegistered: state.user.isRegistered,
  };
};

export default connect(mapStateToProps, {})(Register);
