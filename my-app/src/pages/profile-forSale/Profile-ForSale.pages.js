import { useEffect } from "react";
import { connect } from "react-redux";

import { fetchUserProfileNotes } from "../../redux/actions/note.actions";
import ProfileMenu from "../../components/profile-menu/ProfileMenu.component";
import Notes from "../../components/notes/notes.component";
import { Bars } from "react-loader-spinner";

import "./Profile-ForSale.styles.scss";
import AddNoteForm from "../../components/add-note-form/addNoteForm";

function ProfileForSale({
  fetchUserProfileNotes,
  userProfileNotes,
  userInfo,
  hasAddedNote,
}) {
  useEffect(() => {
    fetchUserProfileNotes();
    // return () => {
    //   cleanup
    // }
  }, [fetchUserProfileNotes, hasAddedNote]);
  const username = localStorage.getItem("username");
  return (
    <div className="profile-forsale-page-container">
      <ProfileMenu />
      <div className="profile-notes-form-container">
        {userProfileNotes ? (
          <Notes
            notes={userProfileNotes}
            notesStyle="notes-forSale"
            noteStyle="forSale"
            user_name={username}
          />
        ) : (
          <Bars
            height="25"
            width="25"
            color="#2186eb"
            arialLabel="loading-indicator"
            wrapperClass="loading-bars"
          />
        )}
        <AddNoteForm />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userProfileNotes: state.notes.userProfileNotes,
    isAddingNote: state.notes.isAddingNote,
    hasAddedNote: state.notes.hasAddedNote,
  };
};

export default connect(mapStateToProps, { fetchUserProfileNotes })(
  ProfileForSale
);
