import "./impText.styles.scss";

export default function ImpText({ textStyle, children, handleClick }) {
  return (
    <span onClick={handleClick} className={textStyle}>
      {children}
    </span>
  );
}
