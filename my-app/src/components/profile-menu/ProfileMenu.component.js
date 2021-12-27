import React from "react";
import { Link } from "react-router-dom";

export default function ProfileMenu() {
  return (
    <>
      <Link to="/profile/">Profile</Link>
      <Link to="/profile/forSale">Items for Sale</Link>
      <Link to="/profile/purchased">Items Purchased</Link>
    </>
  );
}
