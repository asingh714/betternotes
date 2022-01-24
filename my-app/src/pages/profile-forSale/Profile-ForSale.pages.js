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
  userInfo,
  hasAddedNote,
  isFetchingNotes,
  isAddingNote,
  isDeletingNote,
  deleteNote,
}) {
  const [showDelete, setShowDelete] = useState(false);
  const [noteIdToDelete, setNoteIdToDelete] = useState(null);
  const [noteIdToEdit, setNoteIdToEdit] = useState(null);
  const [noteToEdit, setNoteToEdit] = useState({});

  useEffect(() => {
    fetchUserProfileNotes();
    if (noteIdToEdit !== "") {
      const note = userProfileNotes.find(
        (note) => note.unique_note_id === noteIdToEdit
      );
      setNoteToEdit(note);
    }
    // return () => {
    //   cleanup
    // }
  }, [
    fetchUserProfileNotes,
    isFetchingNotes,
    isAddingNote,
    isDeletingNote,
    noteIdToEdit,
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
            handleDeleteModal={handleDeleteModal}
            setNoteIdToDelete={setNoteIdToDelete}
            setNoteIdToEdit={setNoteIdToEdit}
          />
        )}
        <AddNoteForm noteToEdit={noteToEdit} />
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
    isFetchingNotes: state.notes.isFetchingNotes,
    isAddingNote: state.notes.isAddingNote,
    isDeletingNote: state.notes.isDeletingNote,
    hasAddedNote: state.notes.hasAddedNote,
  };
};

export default connect(mapStateToProps, { fetchUserProfileNotes, deleteNote })(
  ProfileForSale
);
