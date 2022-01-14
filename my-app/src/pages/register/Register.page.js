import { connect } from "react-redux";

import RegisterForm from "../../components/register-form/register-form.component";
import Modal from "../../components/modal/modal.component";
import ImpText from "../../components/imp-text/impText.component";

import "./Register.styles.scss";
function Register({ isRegistered }) {
  return (
    <div className="register-page-container">
      {isRegistered ? (
        <Modal modalStyle="modal-container">
          <ImpText textStyle="large-plain-text">
            Your account has been created!
          </ImpText>
          <ImpText textStyle="large-plain-text">
            Please check your email for a verification link.
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
