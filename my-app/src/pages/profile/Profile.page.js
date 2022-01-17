import { Component } from "react";

import ProfileMenu from "../../components/profile-menu/ProfileMenu.component";
import ProfilePageForm from "../../components/profile-page-form/ProfilePageForm.component";
import ProfileData from "../../components/profile-data/ProfileData.component";

import "./Profile.styles.scss";

class Profile extends Component {
  state = {
    showEditProfile: false,
  };

  showProfilePageForm = (event) => {
    this.setState({
      showEditProfile: !this.state.showEditProfile,
    });
  };

  render() {
    return (
      <div className="profile-page-container">
        <ProfileMenu />

        {this.state.showEditProfile ? (
          <ProfilePageForm />
        ) : (
          <ProfileData showProfilePageForm={this.showProfilePageForm} />
        )}
      </div>
    );
  }
}

export default Profile;
