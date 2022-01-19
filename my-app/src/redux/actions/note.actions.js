import { axiosWithAuth } from "../../utils/axiosWithAuth";

export const NOTE_FETCH_START = "NOTE_FETCH_START";
export const NOTE_FETCH_SUCCESS = "NOTE_FETCH_SUCCESS";
export const NOTE_FETCH_FAILURE = "NOTE_FETCH_FAILURE";

export const fetchNotes = () => (dispatch) => {
  dispatch({ type: NOTE_FETCH_START });
  axiosWithAuth()
    .get("/notes")
    .then((result) => {
      dispatch({
        type: NOTE_FETCH_SUCCESS,
        payload: result.data
          ? result.data.sort((a, b) => a["created_date"] - b["created_date"])
          : [],
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: NOTE_FETCH_FAILURE });
    });
};

export const SINGLE_NOTE_FETCH_START = "SINGLE_NOTE_FETCH_START";
export const SINGLE_NOTE_FETCH_SUCCESS = "SINGLE_NOTE_FETCH_SUCCESS";
export const SINGLE_NOTE_FETCH_FAILURE = "SINGLE_NOTE_FETCH_FAILURE";

export const fetchSingleNote = (unique_note_id) => (dispatch) => {
  dispatch({ type: SINGLE_NOTE_FETCH_START });

  axiosWithAuth()
    .get(`/notes/${unique_note_id}`)
    .then((result) => {
      dispatch({ type: SINGLE_NOTE_FETCH_SUCCESS, payload: result.data });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: SINGLE_NOTE_FETCH_FAILURE });
    });
};

export const FETCH_USER_PROFILE_NOTES_START = "FETCH_USER_PROFILE_NOTES_START";
export const FETCH_USER_PROFILE_NOTES_SUCCESS =
  "FETCH_USER_PROFILE_NOTES_SUCCESS";
export const FETCH_USER_PROFILE_NOTES_FAILURE =
  "FETCH_USER_PROFILE_NOTES_FAILURE";

export const fetchUserProfileNotes = () => (dispatch) => {
  dispatch({ type: FETCH_USER_PROFILE_NOTES_START });
  axiosWithAuth()
    .get("/notes/myNotes")
    .then((result) => {
      dispatch({
        type: FETCH_USER_PROFILE_NOTES_SUCCESS,
        payload: result.data ? result.data : [],
      });
    })
    .catch((error) => {
      dispatch({ type: FETCH_USER_PROFILE_NOTES_FAILURE });
    });
};

export const ADD_NOTE_START = "ADD_NOTE_START";
export const ADD_NOTE_SUCCESS = "ADD_NOTE_SUCCESS";
export const ADD_NOTE_FAILURE = "ADD_NOTE_FAILURE";

// THIS IS NOT WORKING.
export const createNote = (note) => (dispatch) => {
  dispatch({ type: ADD_NOTE_START });
  axiosWithAuth()
    .post("/notes", note)
    .then((result) => {
      console.log(result);
      dispatch({ type: ADD_NOTE_SUCCESS });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: ADD_NOTE_FAILURE });
    });
};
