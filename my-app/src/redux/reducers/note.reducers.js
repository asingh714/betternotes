import {
  NOTE_FETCH_START,
  NOTE_FETCH_SUCCESS,
  NOTE_FETCH_FAILURE,
  SINGLE_NOTE_FETCH_START,
  SINGLE_NOTE_FETCH_SUCCESS,
  SINGLE_NOTE_FETCH_FAILURE,
  FETCH_USER_PROFILE_NOTES_START,
  FETCH_USER_PROFILE_NOTES_SUCCESS,
  FETCH_USER_PROFILE_NOTES_FAILURE,
  ADD_NOTE_START,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAILURE,
  DELETE_NOTE_START,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAILURE,
  EDIT_NOTE_START,
  EDIT_NOTE_SUCCESS,
  EDIT_NOTE_FAILURE,
} from "../actions/note.actions";

const initialState = {
  notes: [],
  isFetchingNotes: false,
  hasFetchedNotes: false,
  errorFetchingNotes: "",
  singleNote: {},
  isFetchingSingleNote: false,
  hasFetchedSingleNote: false,
  singleNoteError: "",
  userProfileNotes: [],
  isFetchingUserProfileNotes: false,
  hasFetchedUserProfileNotes: false,
  fetchingUserProfileNotesError: "",
  isAddingNote: false,
  hasAddedNote: false,
  addingNoteError: "",
  isDeletingNote: false,
  hasDeletedNote: false,
  deletingNoteError: "",
  isEditingNote: false,
  hasEditedNote: false,
  editingNoteError: "",
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTE_FETCH_START:
      return {
        ...state,
        notes: [],
        isFetchingNotes: true,
        hasFetchedNotes: false,
        errorFetchingNotes: "",
      };
    case NOTE_FETCH_SUCCESS:
      return {
        ...state,
        notes: action.payload,
        isFetchingNotes: false,
        hasFetchedNotes: true,
        errorFetchingNotes: "",
      };
    case NOTE_FETCH_FAILURE:
      return {
        ...state,
        notes: [],
        isFetchingNotes: false,
        hasFetchedNotes: false,
        errorFetchingNotes: "There was an error fetching the notes.",
      };
    case SINGLE_NOTE_FETCH_START:
      return {
        ...state,
        // singleNote: {},
        isFetchingSingleNote: true,
        hasFetchedSingleNote: false,
        singleNoteError: "",
      };
    case SINGLE_NOTE_FETCH_SUCCESS:
      return {
        ...state,
        singleNote: action.payload,
        isFetchingSingleNote: false,
        hasFetchedSingleNote: true,
        singleNoteError: "",
      };
    case SINGLE_NOTE_FETCH_FAILURE:
      return {
        ...state,
        singleNote: {},
        isFetchingSingleNote: false,
        hasFetchedSingleNote: false,
        singleNoteError: "There was an error while fetching this note.",
      };
    case FETCH_USER_PROFILE_NOTES_START:
      return {
        ...state,
        // userProfileNotes: [],
        isFetchingUserProfileNotes: true,
        hasFetchedUserProfileNotes: false,
        fetchingUserProfileNotesError: "",
      };
    case FETCH_USER_PROFILE_NOTES_SUCCESS:
      return {
        ...state,
        userProfileNotes: action.payload,
        isFetchingUserProfileNotes: false,
        hasFetchedUserProfileNotes: true,
        fetchingUserProfileNotesError: "",
      };
    case FETCH_USER_PROFILE_NOTES_FAILURE:
      return {
        ...state,
        userProfileNotes: [],
        isFetchingUserProfileNotes: false,
        hasFetchedUserProfileNotes: false,
        fetchingUserProfileNotesError:
          "There was an error while fetching your notes.",
      };
    case ADD_NOTE_START:
      return {
        ...state,
        isAddingNote: true,
        hasAddedNote: false,
        addingNoteError: "",
      };
    case ADD_NOTE_SUCCESS:
      return {
        ...state,
        isAddingNote: false,
        hasAddedNote: true,
        addingNoteError: "",
      };
    case ADD_NOTE_FAILURE:
      return {
        ...state,
        isAddingNote: false,
        hasAddedNote: false,
        addingNoteError: "There was an error while adding this note.",
      };
    case DELETE_NOTE_START:
      return {
        ...state,
        isDeletingNote: true,
        hasDeletedNote: false,
        deletingNoteError: "",
      };
    case DELETE_NOTE_SUCCESS:
      return {
        ...state,
        isDeletingNote: false,
        hasDeletedNote: true,
        deletingNoteError: "",
      };
    case DELETE_NOTE_FAILURE:
      return {
        ...state,
        isDeletingNote: false,
        hasDeletedNote: false,
        deletingNoteError: "There was an error while adding this note.",
      };
    case EDIT_NOTE_START:
      return {
        ...state,
        isEditingNote: true,
        hasEditedNote: false,
        editingNoteError: "",
      };
    case EDIT_NOTE_SUCCESS:
      return {
        ...state,
        isEditingNote: false,
        hasEditedNote: true,
        editingNoteError: "",
      };
    case EDIT_NOTE_FAILURE:
      return {
        ...state,
        isEditingNote: false,
        hasEditedNote: false,
        editingNoteError: "There was an error while editing this note.",
      };
    default:
      return state;
  }
};

export default notesReducer;
