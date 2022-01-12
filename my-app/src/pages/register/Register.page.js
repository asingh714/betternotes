import RegisterForm from "../../components/register-form/register-form.component";
import Modal from "../../components/modal/modal.component";
import ImpText from "../../components/imp-text/impText.component";

export default function Register() {
  return (
    <div className="register-page-container">
      <RegisterForm />
      {/* <Modal modalStyle="modal-container">
        <ImpText textStyle="large-plain-text">
          Your account has been created!
        </ImpText>
        <ImpText textStyle="large-plain-text">
          Please check your email for a verification link.
        </ImpText>
      </Modal> */}
    </div>
  );
}
