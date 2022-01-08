import "./button.styles.scss";

export default function Button({ children, type, handleSubmit, buttonStyle }) {
  return (
    <button type={type} onClick={handleSubmit} className={buttonStyle}>
      {children}
    </button>
  );
}
