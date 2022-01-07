import React from "react";

export default function CheckboxMenu({ label, options }) {
  return (
    <form>
      <legend>{label}</legend>
      {options.map((option) => (
        <div key={option}>
          <input type="checkbox" name={option} id={option} value={option} />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </form>
  );
}
