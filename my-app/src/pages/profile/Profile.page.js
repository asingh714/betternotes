import { Component } from "react";
import { connect } from "react-redux";

import ProfileMenu from "../../components/profile-menu/ProfileMenu.component";
import ProfilePageForm from "../../components/profile-page-form/ProfilePageForm.component";

import { fetchOwnProfileData } from "../../redux/actions/user.actions";

class Profile extends Component {
  componentDidMount() {
    this.props.fetchOwnProfileData();
  }
  render() {
    return (
      <>
        <ProfileMenu />
        <ProfilePageForm />
      </>
    );
  }
}

export default connect(null, { fetchOwnProfileData })(Profile);
