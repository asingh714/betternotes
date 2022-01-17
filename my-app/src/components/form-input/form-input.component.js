import "./form-input.styles.scss";

export default function FormInput({
  name,
  handleChange,
  placeholder,
  type,
  value,
  inputStyle,
  accept,
}) {
  return (
    <input
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
      type={type}
      value={value}
      className={inputStyle}
      accept={accept}
    />
  );
}
