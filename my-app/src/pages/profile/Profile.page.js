import { useNavigate } from "react-router-dom";

import ProfileMenu from "../../components/profile-menu/ProfileMenu.component";
// import ProfilePageForm from "../edit-profile/EditProfilePageForm.component";
import ProfileData from "../../components/profile-data/ProfileData.component";

import "./Profile.styles.scss";

function Profile() {
  const navigate = useNavigate();

  return (
    <div className="profile-page-container">
      <ProfileMenu />
      <ProfileData showProfilePageForm={() => navigate("/profile/edit")} />
    </div>
  );
}


export default Profile;
