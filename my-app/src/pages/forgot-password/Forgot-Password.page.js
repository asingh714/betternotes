import { connect } from "react-redux";

import ForgotPasswordForm from "../../components/forgot-password-form/forgot-password-form.component";
import Modal from "../../components/modal/modal.component";
import ImpText from "../../components/imp-text/impText.component";

import "./Forgot-Password.styles.scss";
function ForgotPassword({ hasRequestedNewPassword }) {
  return (
    <div className="forgot-pw-page-container">
      {hasRequestedNewPassword ? (
        <Modal modalStyle="modal-container">
          <ImpText textStyle="large-plain-text">
            Please check your email to reset your password
          </ImpText>
        </Modal>
      ) : (
        <ForgotPasswordForm />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    hasRequestedNewPassword: state.user.hasRequestedNewPassword,
  };
};

export default connect(mapStateToProps, {})(ForgotPassword);
