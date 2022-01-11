import React from "react";

import CheckboxMenu from "../checkboxMenu/checkboxMenu.component";
import Dropdown from "../dropdown/dropdown.component";
import Button from "../button/button.component";
import Line from "../line/line.component";

import "./filterMenu.styles.scss";

export default function FilterMenu({
  schools,
  subjects,
  gradeLevels,
  years,
  schoolName,
  subjectName,
  gradeLevelName,
  yearName,
  filterNoteChanges,
  filterMenuSubmit,
}) {
  return (
    <form className="filter-menu-container">
      {schools && (
        <Dropdown
          dropdownStyle="filterMenu"
          label="School"
          onChange={filterNoteChanges}
          options={schools}
          name={schoolName}
        />
      )}

      {subjects && (
        <Dropdown
          dropdownStyle="filterMenu"
          label="Subjects"
          onChange={filterNoteChanges}
          options={subjects}
          name={subjectName}
        />
      )}
      {gradeLevels && (
        <Dropdown
          dropdownStyle="filterMenu"
          label="Grade Levels"
          onChange={filterNoteChanges}
          options={gradeLevels}
          name={gradeLevelName}
        />
      )}
      <Line classname="filter-line" />
      {years && (
        <CheckboxMenu
          label="Written In"
          legendStyle="legend-checkbox"
          inputStyle="input-checkbox"
          labelStyle="label-checkbox"
          onChange={filterNoteChanges}
          options={years}
          name={yearName}
        />
      )}
      <Line classname="filter-line" />
      <Button
        type="Submit"
        buttonStyle="medium-bluesix-btn"
        handleSubmit={filterMenuSubmit}
      >
        Search
      </Button>
    </form>
  );
}
