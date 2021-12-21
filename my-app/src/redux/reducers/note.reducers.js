import {
  NOTE_FETCH_START,
  NOTE_FETCH_SUCCESS,
  NOTE_FETCH_FAILURE,
} from "../actions/note.actions";

const initialState = {
  notes: [],
  isFetchingNotes: false,
  hasFetchedNotes: false,
  errorFetchingNotes: "",
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTE_FETCH_START:
      return {
        ...state,
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
        isFetchingNotes: false,
        hasFetchedNotes: false,
        errorFetchingNotes: "There was an error fetching the notes.",
      };
    default:
      return state;
  }
};

export default notesReducer;
