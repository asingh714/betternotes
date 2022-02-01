import "./button.styles.scss";

export default function Button({
  children,
  type,
  handleSubmit,
  buttonStyle,
  isDisabled,
}) {
  return (
    <button
      type={type}
      onClick={handleSubmit}
      className={buttonStyle}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
