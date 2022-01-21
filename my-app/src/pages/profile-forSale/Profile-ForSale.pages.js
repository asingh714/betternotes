import { useEffect } from "react";
import { connect } from "react-redux";

import { fetchUserProfileNotes } from "../../redux/actions/note.actions";
import ProfileMenu from "../../components/profile-menu/ProfileMenu.component";
import Notes from "../../components/notes/notes.component";
import { TailSpin } from "react-loader-spinner";

import "./Profile-ForSale.styles.scss";
import AddNoteForm from "../../components/add-note-form/addNoteForm";

function ProfileForSale({
  fetchUserProfileNotes,
  userProfileNotes,
  userInfo,
  hasAddedNote,
  isFetchingNotes,
  isAddingNote,
  isDeletingNote,
}) {
  useEffect(() => {
    fetchUserProfileNotes();
    // return () => {
    //   cleanup
    // }
  }, [fetchUserProfileNotes, isFetchingNotes, isAddingNote, isDeletingNote]);
  const username = localStorage.getItem("username");
  return (
    <div className="profile-forsale-page-container">
      <ProfileMenu />
      <div className="profile-notes-form-container">
        {!userProfileNotes ||
        isFetchingNotes ||
        isAddingNote ||
        isDeletingNote ? (
          <TailSpin
            height="25"
            width="25"
            color="#2186eb"
            arialLabel="loading-indicator"
            wrapperClass="loading-bars"
          />
        ) : (
          <Notes
            notes={userProfileNotes}
            notesStyle="notes-forSale"
            noteStyle="forSale"
            user_name={username}
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
    isFetchingNotes: state.notes.isFetchingNotes,
    isAddingNote: state.notes.isAddingNote,
    isDeletingNote: state.notes.isDeletingNote,
    hasAddedNote: state.notes.hasAddedNote,
  };
};

export default connect(mapStateToProps, { fetchUserProfileNotes })(
  ProfileForSale
);
