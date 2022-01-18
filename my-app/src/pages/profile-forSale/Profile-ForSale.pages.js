import { useEffect } from "react";
import { connect } from "react-redux";

import { fetchUserProfileNotes } from "../../redux/actions/note.actions";
import ProfileMenu from "../../components/profile-menu/ProfileMenu.component";
import Notes from "../../components/notes/notes.component";

import "./Profile-ForSale.styles.scss";
import AddNoteForm from "../../components/add-note-form/addNoteForm";

function ProfileForSale({ fetchUserProfileNotes, userProfileNotes, userInfo }) {
  useEffect(() => {
    fetchUserProfileNotes();
    // return () => {
    //   cleanup
    // }
  }, [fetchUserProfileNotes]);
  const username = localStorage.getItem("username");
  return (
    <div className="profile-forsale-page-container">
      <ProfileMenu />
      <div className="profile-notes-form-container">
        <Notes
          notes={userProfileNotes}
          notesStyle="notes-forSale"
          noteStyle="forSale"
          user_name={username}
        />
        <AddNoteForm />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userProfileNotes: state.notes.userProfileNotes,
  };
};

export default connect(mapStateToProps, { fetchUserProfileNotes })(
  ProfileForSale
);
