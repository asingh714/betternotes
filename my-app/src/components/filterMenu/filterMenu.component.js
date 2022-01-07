import React from "react";
import Dropdown from "../dropdown/dropdown.component";

export default function FilterMenu({ schools, subjects }) {
  return (
    <div>
      <Dropdown label="School" options={schools} />
      <Dropdown label="Subjects" options={subjects} />
    </div>
  );
}
