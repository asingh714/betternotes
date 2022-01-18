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
        singleNote: {},
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
        userProfileNotes: [],
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
    default:
      return state;
  }
};

export default notesReducer;
