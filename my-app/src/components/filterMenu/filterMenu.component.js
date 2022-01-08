import React from "react";

import CheckboxMenu from "../checkboxMenu/checkboxMenu.component";
import Dropdown from "../dropdown/dropdown.component";
import Button from "../button/button.component";
import Line from "../line/line.component";

import "./filterMenu.styles.scss";

export default function FilterMenu({ schools, subjects, gradeLevels, years }) {
  return (
    <div className="filter-menu-container">
      {schools && (
        <Dropdown label="School" options={schools} dropdown="filterMenu" />
      )}

      {subjects && (
        <Dropdown label="Subjects" options={subjects} dropdown="filterMenu" />
      )}
      {gradeLevels && (
        <Dropdown
          label="Grade Levels"
          options={gradeLevels}
          dropdown="filterMenu"
        />
      )}
      <Line classname="filter-line" />
      {years && (
        <CheckboxMenu
          label="Written In"
          options={years}
          legendStyle="legend-checkbox"
          inputStyle="input-checkbox"
          labelStyle="label-checkbox"
        />
      )}
      <Line classname="filter-line" />
      <Button type="Submit" buttonStyle="filter-button">Search</Button>
    </div>
  );
}
