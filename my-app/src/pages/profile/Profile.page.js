import { Component } from "react";

import ProfileMenu from "../../components/profile-menu/ProfileMenu.component";
import ProfilePageForm from "../../components/profile-page-form/ProfilePageForm.component";
import ProfileData from "../../components/profile-data/ProfileData.component";

import "./Profile.styles.scss";

class Profile extends Component {
  state = {
    showModal: false,
  };
  render() {
    return (
      <div className="profile-page-container">
        <ProfileMenu />
        {this.state.showModal ? <ProfilePageForm /> : <ProfileData />}
      </div>
    );
  }
}

export default Profile;
