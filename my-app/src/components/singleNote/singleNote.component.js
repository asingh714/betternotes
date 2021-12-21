import React from "react";

export default function SingleNote(props) {
  const {
    // profile_image,
    class_name,
    short_description,
    price,
    name,
    pages,
    year,
    school,
  } = props.note;
  return (
    <div>
      {/* <img src={profile_image} alt="User profile" /> */}
      <span>{class_name}</span>
      <span>{short_description}</span>
      <span>{price}</span>
      <span>{name}</span>
      <span>{pages}</span>
      <span>{year}</span>
      <span>{school}</span>
    </div>
  );
}
