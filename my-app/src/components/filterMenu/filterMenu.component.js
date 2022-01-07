import React from "react";

import CheckboxMenu from "../checkboxMenu/checkboxMenu.component";
import Dropdown from "../dropdown/dropdown.component";
import Button from "../button/button.component";

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
      {years && <CheckboxMenu label="Written In" options={years} />}
      <Button type="Submit">Search</Button>
    </div>
  );
}
