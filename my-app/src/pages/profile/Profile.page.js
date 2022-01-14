import { Component } from "react";

import ProfileMenu from "../../components/profile-menu/ProfileMenu.component";
import ProfilePageForm from "../../components/profile-page-form/ProfilePageForm.component";
import ProfileData from "../../components/profile-data/ProfileData.component";

import "./Profile.styles.scss";

class Profile extends Component {
  render() {
    return (
      <div className="profile-page-container">
        <ProfileMenu />
        <ProfileData />
        <ProfilePageForm />
      </div>
    );
  }
}

export default Profile;
