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
            Please use the platform below for your verification link.
          </ImpText>
          <a href="https://ethereal.email/messages" className="large-text">
            https://ethereal.email/messages
          </a>
          <ImpText textStyle="large-text">
            Username: ewsuppvc6joshbwx@ethereal.email
          </ImpText>
          <ImpText textStyle="large-text">Password: XmQQPUKuBQNYm1cGnK</ImpText>
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
