import RegisterForm from "../../components/register-form/register-form.component";
import Modal from "../../components/modal/modal.component";

export default function Register() {
  return (
    <div className="register-page-container">
      <RegisterForm />
      {/* <Modal>
        <span>Your account has been created!</span>
        <span>Please check your email for a verification link.</span>
      </Modal> */}
    </div>
  );
}
