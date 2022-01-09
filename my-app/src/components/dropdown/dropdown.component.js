import React from "react";
import "./dropdown.styles.scss";

export default function Dropdown(props) {
  return (
    <>
      {props.hasLabel && <label htmlFor="dropdown">{props.label}</label>}
      <select
        id="dropdown"
        className={props.dropdownStyle}
        onChange={props.onChange}
        name={props.name}
      >
        {!props.hasLabel && (
          <option value="" disabled selected>
            {props.label}
          </option>
        )}
        {props.options.map((option) => (
          <option key={option} value={props.option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
