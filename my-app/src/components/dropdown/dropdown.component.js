import React from "react";
import "./dropdown.styles.scss";

export default function Dropdown(props) {
  if (props.dropdownContainerStyle) {
    return (
      <div className={props.dropdownContainerStyle}>
        {props.hasLabel && (
          <label htmlFor="dropdown" className="label-style">
            {props.label}
          </label>
        )}
        <select
          id="dropdown"
          className={props.dropdownStyle}
          onChange={props.onChange}
          name={props.name}
        >
          {!props.hasLabel && (
            <option value="" disabled>
              {props.label}
            </option>
          )}
          {props.options.map((option) => (
            <option key={option} value={props.option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  } else {
    return (
      <>
        {props.hasLabel && (
          <label htmlFor="dropdown" className="label-style">
            {props.label}
          </label>
        )}
        <select
          id="dropdown"
          className={props.dropdownStyle}
          onChange={props.onChange}
          name={props.name}
        >
          {!props.hasLabel && (
            <option value="" disabled>
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
}
