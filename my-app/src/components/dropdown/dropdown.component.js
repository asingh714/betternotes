import React from "react";

export default function Dropdown(props) {
  return (
    <>
      <label htmlFor="dropdown">{props.label}</label>
      <select id="dropdown" value={props.value} onChange={props.onChange}>
        {props.options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </>
  );
}
