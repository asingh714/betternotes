import { Component } from "react";

import ProfileMenu from "../../components/profile-menu/ProfileMenu.component";
import ProfilePageForm from "../../components/profile-page-form/ProfilePageForm.component";
import ProfileData from "../../components/profile-data/ProfileData.component";

class Profile extends Component {
  render() {
    return (
      <>
        <ProfileMenu />
        <ProfileData />
        <ProfilePageForm />
      </>
    );
  }
}

export default Profile;
