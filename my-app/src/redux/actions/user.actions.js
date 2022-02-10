import { axiosWithAuth } from "../../utils/axiosWithAuth";

export const CHECK_USER_LOGGED_IN_START = "CHECK_USER_LOGGED_IN_START";
export const CHECK_USER_LOGGED_IN_SUCCESS = "CHECK_USER_LOGGED_IN_SUCCESS";
export const CHECK_USER_LOGGED_IN_FAILURE = "CHECK_USER_LOGGED_IN_FAILURE";

export const userLoggedIn = () => (dispatch) => {
  dispatch({ type: CHECK_USER_LOGGED_IN_START });

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (token !== null && username !== null) {
    dispatch({
      type: CHECK_USER_LOGGED_IN_SUCCESS,
      payload: { token: token, username: username },
    });
  } else {
    dispatch({ type: CHECK_USER_LOGGED_IN_FAILURE });
  }
};

export const USER_LOGIN_START = "USER_LOGIN_START";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

export const loginUser = (credentials) => (dispatch) => {
  dispatch({ type: USER_LOGIN_START });

  axiosWithAuth()
    .post("/auth/login", credentials)
    .then((result) => {

      localStorage.setItem("token", result.data.token);
      localStorage.setItem("username", result.data.username);
      dispatch({ type: USER_LOGIN_SUCCESS, payload: result.data });
    })
    .catch((error) => {

      dispatch({ type: USER_LOGIN_FAILURE });
    });
};

export const USER_REGISTER_START = "USER_REGISTER_START";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE";

export const registerUser = (credentials) => (dispatch) => {
  dispatch({ type: USER_REGISTER_START });
  axiosWithAuth()
    .post("/auth/register", credentials)
    .then((result) => {
      dispatch({ type: USER_REGISTER_SUCCESS });
    })
    .catch((error) => {

      dispatch({ type: USER_REGISTER_FAILURE });
    });
};

export const USER_VERIFY_START = "USER_VERIFY_START";
export const USER_VERIFY_SUCCESS = "USER_VERIFY_SUCCESS";
export const USER_VERIFY_FAILURE = "USER_VERIFY_FAILURE";

export const verifyUser = (email, token) => (dispatch) => {
  dispatch({ type: USER_VERIFY_START });

  axiosWithAuth()
    .post(`/auth/verify-email?token=${token}&email=${email}`)
    .then((result) => {
      dispatch({ type: USER_VERIFY_SUCCESS });
    })
    .catch((error) => {

      dispatch({ type: USER_VERIFY_FAILURE });
    });
};

export const FORGOT_PASSWORD_REQUEST_START = "FORGOT_PASSWORD_REQUEST_START";
export const FORGOT_PASSWORD_REQUEST_SUCCESS =
  "FORGOT_PASSWORD_REQUEST_SUCCESS";
export const FORGOT_PASSWORD_REQUEST_FAILURE =
  "FORGOT_PASSWORD_REQUEST_FAILURE ";

export const forgottenPasswordRequest = (email) => (dispatch) => {
  dispatch({ type: FORGOT_PASSWORD_REQUEST_START });

  axiosWithAuth()
    .post("/auth/request-new-password", { email })
    .then((result) => {
      dispatch({ type: FORGOT_PASSWORD_REQUEST_SUCCESS });
    })
    .catch((error) => {

      dispatch({ type: FORGOT_PASSWORD_REQUEST_FAILURE });
    });
};

export const RESET_PASSWORD_REQUEST_START = "RESET_PASSWORD_REQUEST_START";
export const RESET_PASSWORD_REQUEST_SUCCESS = "RESET_PASSWORD_REQUEST_SUCCESS";
export const RESET_PASSWORD_REQUEST_FAILURE = "RESET_PASSWORD_REQUEST_FAILURE ";

export const resetForgottenPassword =
  (token, email, passwords) => (dispatch) => {
    dispatch({ type: RESET_PASSWORD_REQUEST_START });
    axiosWithAuth()
      .post(`/auth/reset-password?token=${token}&email=${email}`, passwords)
      .then((result) => {
        dispatch({ type: RESET_PASSWORD_REQUEST_SUCCESS });
      })
      .catch((error) => {

        dispatch({ type: RESET_PASSWORD_REQUEST_FAILURE });
      });
  };

export const GET_AUTHOR_INFO_START = "GET_AUTHOR_INFO_START";
export const GET_AUTHOR_INFO_SUCCESS = "GET_AUTHOR_INFO_SUCCESS";
export const GET_AUTHOR_INFO_FAILURE = "GET_AUTHOR_INFO_FAILURE";

export const getAuthorProfile = (unique_user_id) => (dispatch) => {
  dispatch({ type: GET_AUTHOR_INFO_START });

  axiosWithAuth()
    .get(`/user/${unique_user_id}`)
    .then((result) => {
      dispatch({ type: GET_AUTHOR_INFO_SUCCESS, payload: result.data });
    })
    .catch((error) => {
      dispatch({ type: GET_AUTHOR_INFO_FAILURE });
    });
};

export const GET_ALL_NOTES_BY_SINGLE_START = "GET_ALL_NOTES_BY_SINGLE_START";
export const GET_ALL_NOTES_BY_SINGLE_SUCCESS =
  "GET_ALL_NOTES_BY_SINGLE_SUCCESS";
export const GET_ALL_NOTES_BY_SINGLE_FAILURE =
  "GET_ALL_NOTES_BY_SINGLE_FAILURE";

export const fetchNotesBySingleUser =
  (unique_user_id, user_id) => (dispatch) => {
    dispatch({ type: GET_ALL_NOTES_BY_SINGLE_START });

    axiosWithAuth()
      .get(`/user/${unique_user_id}/notes/${user_id}`)
      .then((result) => {
        dispatch({
          type: GET_ALL_NOTES_BY_SINGLE_SUCCESS,
          payload: result.data,
        });
      })
      .catch((error) => {
        dispatch({ type: GET_ALL_NOTES_BY_SINGLE_FAILURE });
      });
  };

export const GET_OWN_USER_PROFILE_START = "GET_OWN_USER_PROFILE_START";
export const GET_OWN_USER_PROFILE_SUCCESS = "GET_OWN_USER_PROFILE_SUCCESS";
export const GET_OWN_USER_PROFILE_FAILURE = "GET_OWN_USER_PROFILE_FAILURE";

export const fetchOwnProfileData = () => (dispatch) => {
  dispatch({ type: GET_OWN_USER_PROFILE_START });
  axiosWithAuth()
    .get("/user/profile")
    .then((result) => {
      dispatch({
        type: GET_OWN_USER_PROFILE_SUCCESS,
        payload: result.data,
      });
    })
    .catch((error) => {
      dispatch({ type: GET_OWN_USER_PROFILE_FAILURE });
    });
};

export const UPDATE_USER_PROFILE_START = "UPDATE_USER_PROFILE_START";
export const UPDATE_USER_PROFILE_SUCCESS = "UPDATE_USER_PROFILE_SUCCESS";
export const UPDATE_USER_PROFILE_FAILURE = "UPDATE_USER_PROFILE_FAILURE";

export const updateUserProfile = (credentials, id) => (dispatch) => {
  dispatch({ type: UPDATE_USER_PROFILE_START });
  axiosWithAuth()
    .put(`/user/${id}`, credentials)
    .then((result) => {
      dispatch({ type: UPDATE_USER_PROFILE_SUCCESS });
    })
    .catch((error) => {
      dispatch({ type: UPDATE_USER_PROFILE_FAILURE });
    });
};

export const USER_LOGOUT_START = "USER_LOGOUT_START";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";

export const logoutUser = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT_START });

  let token = localStorage.getItem("token");
  let username = localStorage.getItem("username");

  if (token && username) {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    dispatch({ type: USER_LOGOUT_SUCCESS });
  }
};
