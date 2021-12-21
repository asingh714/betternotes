import React from "react";

export default function SingleNote(props) {
  const { name, short_description, } = props.note;
  return (
    <div>
      <span>{name}</span>
    </div>
  );
}
