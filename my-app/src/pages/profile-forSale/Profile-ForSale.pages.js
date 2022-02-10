import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { TailSpin } from "react-loader-spinner";

import { deleteNote } from "../../redux/actions/note.actions";
import ProfileMenu from "../../components/profile-menu/ProfileMenu.component";
import Notes from "../../components/notes/notes.component";
import AddNoteForm from "../../components/add-note-form/addNoteForm";
import Modal from "../../components/modal/modal.component";
import Button from "../../components/button/button.component";
import ImpText from "../../components/imp-text/impText.component";

import "./Profile-ForSale.styles.scss";
import { fetchUserProfileNotes } from "../../redux/actions/note.actions";

function ProfileForSale({
  fetchUserProfileNotes,
  userProfileNotes,
  // userInfo,
  // hasAddedNote,
  isFetchingUserProfileNotes,
  hasAddedNote,
  hasDeletedNote,
  deleteNote,
  hasEditedNote,
  isAddingNote,
  isEditingNote,
  // hasFetchedUserProfileNotes,
}) {
  const [showDelete, setShowDelete] = useState(false);
  const [noteIdToDelete, setNoteIdToDelete] = useState(null);
  const [noteIdToEdit, setNoteIdToEdit] = useState(null);
  const [noteToEdit, setNoteToEdit] = useState({});

  useEffect(() => {
    fetchUserProfileNotes();
    if (noteIdToEdit !== null && noteIdToEdit !== undefined) {
      const note = userProfileNotes.find(
        (note) => note.unique_note_id === noteIdToEdit
      );
      setNoteToEdit(note);
    }
  }, [
    fetchUserProfileNotes,
    noteIdToEdit,
    hasAddedNote,
    hasDeletedNote,
    hasEditedNote,
  ]);
  const username = localStorage.getItem("username");

  const handleDeleteModal = () => {
    setShowDelete(!showDelete);
  };

  const handleDeleteNote = () => {
    deleteNote(noteIdToDelete);
    setShowDelete(!showDelete);
  };

  return (
    <div className="profile-forsale-page-container">
      <ProfileMenu />
      <div className="profile-notes-form-container">
        {isFetchingUserProfileNotes || isAddingNote || isEditingNote ? (
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
            handleDeleteModal={handleDeleteModal}
            setNoteIdToDelete={setNoteIdToDelete}
            setNoteIdToEdit={setNoteIdToEdit}
            // noteIdToEdit={noteIdToEdit}
          />
        )}
        <h2>Add a note</h2>
        <AddNoteForm
          noteToEdit={noteToEdit}
          setNoteToEdit={setNoteToEdit}
          setNoteIdToEdit={setNoteIdToEdit}
        />
        {showDelete && (
          <div className="bg-container" onClick={handleDeleteModal}>
            {showDelete && (
              <Modal modalStyle="modal-container">
                <ImpText textStyle="large-plain-text">
                  Are you sure you want to delete this item?
                </ImpText>
                <div className="button-container">
                  <Button
                    handleSubmit={handleDeleteModal}
                    buttonStyle="small-bluesix-btn"
                  >
                    No
                  </Button>
                  <Button
                    handleSubmit={handleDeleteNote}
                    buttonStyle="small-blueseven-btn"
                  >
                    Yes
                  </Button>
                </div>
              </Modal>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userProfileNotes: state.notes.userProfileNotes,
    isFetchingUserProfileNotes: state.notes.isFetchingUserProfileNotes,
    hasAddedNote: state.notes.hasAddedNote,
    hasEditedNote: state.notes.hasEditedNote,
    hasDeletedNote: state.notes.hasDeletedNote,
    isAddingNote: state.notes.isAddingNote,
    isEditingNote: state.notes.isEditingNote,
    // hasDeletedNote: state.notes.hasDeletedNote,
    // hasFetchedUserProfileNotes: state.notes.hasFetchedUserProfileNotes,
  };
};

export default connect(mapStateToProps, { fetchUserProfileNotes, deleteNote })(
  ProfileForSale
);
