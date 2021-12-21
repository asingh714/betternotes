import { axiosWithAuth } from "../../utils/axiosWithAuth";

export const NOTE_FETCH_START = "NOTE_FETCH_START";
export const NOTE_FETCH_SUCCESS = "NOTE_FETCH_SUCCESS";
export const NOTE_FETCH_FAILURE = "NOTE_FETCH_FAILURE";

export const fetchNotes = () => (dispatch) => {
  dispatch({ type: NOTE_FETCH_START });
  axiosWithAuth()
    .get("/notes")
    .then((result) => {
      console.log(result);
      dispatch({ type: NOTE_FETCH_SUCCESS, payload: result.data });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: NOTE_FETCH_FAILURE });
    });
};
