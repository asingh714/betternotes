import "./impText.styles.scss";

export default function ImpText({ textStyle, children }) {
  return <span className={textStyle}>{children}</span>;
}
