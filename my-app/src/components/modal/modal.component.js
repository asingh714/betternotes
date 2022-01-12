import "./modal.styles.scss";
export default function Modal({ children, modalStyle }) {
  return <div className={modalStyle}>{children}</div>;
}
