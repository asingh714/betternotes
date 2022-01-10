import React from "react";

import SingleNote from "../singleNote/singleNote.component";

export default function Notes(props) {
  return (
    <>
      {props.notes.map((note) => (
        <SingleNote
          note={note}
          key={note.id}
          id={note.unique_note_id}
          noteStyle={props.noteStyle}
          {...props}
        />
      ))}
    </>
  );
}
