export default function Button({ children, type, handleSubmit }) {
  return (
    <button type={type} onClick={handleSubmit}>
      {children}
    </button>
  );
}
