import React from "react";

export default function SingleNote(props) {
  const {
    profile_image,
    class_name,
    short_description,
    price,
    user_name,
    pages,
    year,
    school,
    unique_note_id,
  } = props.note;
  return (
    <div>
      <span>{unique_note_id}</span>
      <img
        src={profile_image}
        alt="User profile"
        height="100px"
        width="100px"
      />
      <span>{class_name}</span>
      <span>{short_description}</span>
      <span>{price}</span>
      <span>{user_name}</span>
      <span>{pages}</span>
      <span>{year}</span>
      <span>{school}</span>
    </div>
  );
}
