export default function FormInput({
  name,
  handleChange,
  placeholder,
  type,
  value,
}) {
  return (
    <input
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
}
