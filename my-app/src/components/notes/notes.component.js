import { TailSpin } from "react-loader-spinner";

import SingleNote from "../singleNote/singleNote.component";
import "./notes.styles.scss";

export default function Notes(props) {
  if (props.notes == null || Object.keys(props.notes).length === 0) {
    return (
      <TailSpin
        height="100"
        width="100"
        color="#2186eb"
        arialLabel="loading-indicator"
        wrapperClass="loading-bars"
      />
    );
  }
  if (props.notes && props.notes.length > 0) {
    return (
      <div className={props.notesStyle}>
        {props.notes.map((note) => (
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
}
