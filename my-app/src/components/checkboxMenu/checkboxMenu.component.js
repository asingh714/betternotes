import React from "react";

import "./checkboxMenu.styles.scss";

export default function CheckboxMenu({
  label,
  options,
  legendStyle,
  inputStyle,
  labelStyle,
  onChange,
  name,
}) {
  return (
    <div>
      <legend className={legendStyle}>{label}</legend>
      {options.map((option) => (
        <div key={option}>
          <input
            type="checkbox"
            name={name}
            onChange={onChange}
            id={option}
            value={option}
            className={inputStyle}
          />
          <label htmlFor={option} className={labelStyle}>
            {option}
          </label>
        </div>
      ))}
    </div>
  );
}
