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
