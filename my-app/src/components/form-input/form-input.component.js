import React from "react";

export default function FormInput({
  name,
  handleChange,
  placeHolder,
  type,
  value,
}) {
  return (
    <input
      name={name}
      onChange={handleChange}
      placeHolder={placeHolder}
      type={type}
      value={value}
    />
  );
}
