import React from "react";
import Dropdown from "../dropdown/dropdown.component";

export default function FilterMenu({ schools, subjects, gradeLevels }) {
  return (
    <>
      {schools && <Dropdown label="School" options={schools} />}
      {subjects && <Dropdown label="Subjects" options={subjects} />}
      {gradeLevels && <Dropdown label="Grade Levels" options={gradeLevels} />}
    </>
  );
}
