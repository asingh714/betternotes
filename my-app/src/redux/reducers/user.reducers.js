import {
  USER_REGISTER_START,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
} from "../actions/user.actions";

const initialState = {
  isRegistering: false,
  isRegistered: false,
  registrationError: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_START:
      return {
        ...state,
        isRegistering: true,
        isRegistered: false,
        registrationError: "",
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        isRegistering: false,
        isRegistered: true,
        registrationError: "",
      };
    case USER_REGISTER_FAILURE:
      return {
        ...state,
        isRegistering: false,
        isRegistered: false,
        registrationError: "There was an error while registering",
      };
    default:
      return state;
  }
};

export default userReducer;
