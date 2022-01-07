import React from "react";
import "./dropdown.styles.scss";

export default function Dropdown(props) {
  return (
    <>
      {props.hasLabel && <label htmlFor="dropdown">{props.label}</label>}
      <select
        id="dropdown"
        value={props.value}
        onChange={props.onChange}
        className={props.dropdown}
      >
        {!props.hasLabel && (
          <option value="" disabled selected>
            {props.label}
          </option>
        )}
        {props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
