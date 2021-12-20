import { axiosWithAuth } from "../../utils/axiosWithAuth";

export const USER_REGISTER_START = "USER_REGISTER_START";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE";

export const registerUser = (credentials) => (dispatch) => {
  dispatch({ type: USER_REGISTER_START });
  axiosWithAuth()
    .post("/auth/register", credentials)
    .then((result) => {
      console.log(result);
      dispatch({ type: USER_REGISTER_SUCCESS });
    })
    .catch((error) => {
      console.log(error);
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
      console.log(result);
      dispatch({ type: USER_VERIFY_SUCCESS });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: USER_VERIFY_FAILURE });
    });
};

export const USER_LOGIN_START = "USER_LOGIN_START";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_VERIFY_FAILURE";

export const loginUser = (credentials) => (dispatch) => {
  dispatch({ type: USER_LOGIN_START });

  axiosWithAuth()
    .post("/auth/login", credentials)
    .then((result) => {
      console.log(result);
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("username", result.data.username);
      dispatch({ type: USER_LOGIN_SUCCESS, payload: result.data });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: USER_LOGIN_FAILURE });
    });
};
