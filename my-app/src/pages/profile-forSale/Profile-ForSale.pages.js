import { useEffect } from "react";
import { connect } from "react-redux";

import { fetchUserProfileNotes } from "../../redux/actions/note.actions";

import ProfileMenu from "../../components/profile-menu/ProfileMenu.component";

function ProfileForSale({ fetchUserProfileNotes }) {
  useEffect(() => {
    fetchUserProfileNotes();
    // return () => {
    //   cleanup
    // }
  }, [fetchUserProfileNotes]);
  return (
    <>
      <ProfileMenu />
      <span>PROFILE FOR SALE</span>
    </>
  );
}

export default connect(null, { fetchUserProfileNotes })(ProfileForSale);
