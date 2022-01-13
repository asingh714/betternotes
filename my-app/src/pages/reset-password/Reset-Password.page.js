import { connect } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ResetPasswordForm from "../../components/reset-password-form/reset-password-form.component";
import Modal from "../../components/modal/modal.component";
import ImpText from "../../components/imp-text/impText.component";

import "./Reset-Password.styles.scss";
function ResetPassword({ hasResetPassword }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (hasResetPassword) {
      const timer = setInterval(() => {
        navigate("/login");
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [hasResetPassword, navigate]);
  return (
    <div className="reset-pw-page-container">
      {hasResetPassword ? (
        <Modal modalStyle="modal-container">
          <ImpText textStyle="large-plain-text">
            Your password has been reset
          </ImpText>
        </Modal>
      ) : (
        <ResetPasswordForm />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    hasResetPassword: state.user.hasResetPassword,
  };
};

export default connect(mapStateToProps, {})(ResetPassword);
