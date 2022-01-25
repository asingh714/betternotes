import { NavLink } from "react-router-dom";

import Line from "../line/line.component";

import "./ProfileMenu.styles.scss";

export default function ProfileMenu() {
  return (
    <nav className="profile-nav-container">
      <NavLink to="/profile" className="profile-nav-link">
        Profile
      </NavLink>
      <Line classname="short-line" />
      <NavLink to="/profile/forSale" className="profile-nav-link">
        Items for Sale
      </NavLink>
      <Line classname="short-line" />
      <NavLink to="/profile/purchased" className="profile-nav-link">
        Items Purchased
      </NavLink>
    </nav>
  );
}
