import React from "react";

import SingleNote from "../singleNote/singleNote.component";
import "./notes.styles.scss";

export default function Notes(props) {
  return (
    <div className={props.notesStyle}>
      {props.notes &&
        props.notes.map((note) => (
          <SingleNote
            note={note}
            key={note.id}
            id={note.unique_note_id}
            noteStyle={props.noteStyle}
            {...props}
          />
        ))}
    </div>
  );
}
