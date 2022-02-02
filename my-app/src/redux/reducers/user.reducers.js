import {
  USER_REGISTER_START,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_VERIFY_START,
  USER_VERIFY_SUCCESS,
  USER_VERIFY_FAILURE,
  USER_LOGIN_START,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  FORGOT_PASSWORD_REQUEST_START,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
  FORGOT_PASSWORD_REQUEST_FAILURE,
  RESET_PASSWORD_REQUEST_START,
  RESET_PASSWORD_REQUEST_SUCCESS,
  RESET_PASSWORD_REQUEST_FAILURE,
  GET_AUTHOR_INFO_START,
  GET_AUTHOR_INFO_SUCCESS,
  GET_AUTHOR_INFO_FAILURE,
  GET_ALL_NOTES_BY_SINGLE_START,
  GET_ALL_NOTES_BY_SINGLE_SUCCESS,
  GET_ALL_NOTES_BY_SINGLE_FAILURE,
  GET_OWN_USER_PROFILE_START,
  GET_OWN_USER_PROFILE_SUCCESS,
  GET_OWN_USER_PROFILE_FAILURE,
  CHECK_USER_LOGGED_IN_START,
  CHECK_USER_LOGGED_IN_SUCCESS,
  CHECK_USER_LOGGED_IN_FAILURE,
  USER_LOGOUT_START,
  USER_LOGOUT_SUCCESS,
} from "../actions/user.actions";

const initialState = {
  isUserLoggedIn: false,
  userLoggedInError: "",
  isRegistering: false,
  isRegistered: false,
  registrationError: "",
  isVerifying: false,
  ifVerified: false,
  verificationError: "",
  isLoggingIn: false,
  isLoggedIn: false,
  loggingError: "",
  token: "",
  username: "",
  isRequestingNewPassword: false,
  hasRequestedNewPassword: false,
  requestedNewPasswordError: "",
  isResettingPassword: false,
  hasResetPassword: false,
  resetPasswordError: "",
  userInfo: {},
  isFetchingUser: false,
  hasFetchedUser: false,
  fetchUserError: "",
  userNotes: [],
  isFetchingNotesBySingleUser: false,
  hasFetchedNotesBySingleUser: false,
  fetchNotesBySingleUser: "",
  profileData: {},
  isFetchingProfileData: false,
  hasFetchedProfileData: false,
  fetchingProfileDataError: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_USER_LOGGED_IN_START:
      return {
        ...state,
        isUserLoggedIn: false,
        userLoggedInError: "",
      };
    case CHECK_USER_LOGGED_IN_SUCCESS:
      return {
        ...state,
        isUserLoggedIn: true,
        userLoggedInError: "",
        token: action.payload.token,
        username: action.payload.username,
      };
    case CHECK_USER_LOGGED_IN_FAILURE:
      return {
        ...state,
        isUserLoggedIn: false,
        userLoggedInError: "The user is not logged in.",
        token: "",
        username: "",
      };
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
    case USER_VERIFY_START:
      return {
        ...state,
        isVerifying: true,
        ifVerified: false,
        verificationError: "",
      };
    case USER_VERIFY_SUCCESS:
      return {
        ...state,
        isVerifying: false,
        ifVerified: true,
        verificationError: "",
      };
    case USER_VERIFY_FAILURE:
      return {
        ...state,
        isVerifying: false,
        ifVerified: false,
        verificationError: "There was an error while verifying this profile.",
      };
    case USER_LOGIN_START:
      return {
        ...state,
        isLoggingIn: true,
        isLoggedIn: false,
        loggingError: "",
        token: "",
        username: "",
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        loggingError: "",
        token: action.payload.token,
        username: action.payload.username,
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        loggingError: "There was an error while logging in.",
        token: "",
        username: "",
      };
    case FORGOT_PASSWORD_REQUEST_START:
      return {
        ...state,
        isRequestingNewPassword: true,
        hasRequestedNewPassword: false,
        requestedNewPasswordError: "",
      };
    case FORGOT_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        isRequestingNewPassword: false,
        hasRequestedNewPassword: true,
        requestedNewPasswordError: "",
      };
    case FORGOT_PASSWORD_REQUEST_FAILURE:
      return {
        ...state,
        isRequestingNewPassword: false,
        hasRequestedNewPassword: false,
        requestedNewPasswordError: "There was an error.",
      };
    case RESET_PASSWORD_REQUEST_START:
      return {
        ...state,
        isResettingPassword: true,
        hasResetPassword: false,
        resetPasswordError: "",
      };
    case RESET_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        isResettingPassword: false,
        hasResetPassword: true,
        resetPasswordError: "",
      };
    case RESET_PASSWORD_REQUEST_FAILURE:
      return {
        ...state,
        isResettingPassword: false,
        hasResetPassword: false,
        resetPasswordError: "There was an error resetting your password.",
      };
    case GET_AUTHOR_INFO_START:
      return {
        ...state,
        userInfo: {},
        isFetchingUser: true,
        hasFetchedUser: false,
        fetchUserError: "",
      };
    case GET_AUTHOR_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        isFetchingUser: false,
        hasFetchedUser: true,
        fetchUserError: "",
      };
    case GET_AUTHOR_INFO_FAILURE:
      return {
        ...state,
        userInfo: {},
        isFetchingUser: false,
        hasFetchedUser: false,
        fetchUserError: "There was an error fetching the author's information.",
      };
    case GET_ALL_NOTES_BY_SINGLE_START:
      return {
        ...state,
        userNotes: [],
        isFetchingNotesBySingleUser: true,
        hasFetchedNotesBySingleUser: false,
        fetchNotesBySingleUser: "",
      };
    case GET_ALL_NOTES_BY_SINGLE_SUCCESS:
      return {
        ...state,
        userNotes: action.payload,
        isFetchingNotesBySingleUser: false,
        hasFetchedNotesBySingleUser: true,
        fetchNotesBySingleUser: "",
      };
    case GET_ALL_NOTES_BY_SINGLE_FAILURE:
      return {
        ...state,
        userNotes: [],
        isFetchingNotesBySingleUser: false,
        hasFetchedNotesBySingleUser: false,
        fetchNotesBySingleUser: "There was an error while fetching the notes",
      };
    case GET_OWN_USER_PROFILE_START:
      return {
        ...state,
        profileData: {},
        isFetchingProfileData: true,
        hasFetchedProfileData: false,
        fetchingProfileDataError: "",
      };
    case GET_OWN_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profileData: action.payload,
        isFetchingProfileData: false,
        hasFetchedProfileData: true,
        fetchingProfileDataError: "",
      };
    case GET_OWN_USER_PROFILE_FAILURE:
      return {
        ...state,
        profileData: {},
        isFetchingProfileData: false,
        hasFetchedProfileData: false,
        fetchingProfileDataError:
          "There was an error while fetching your profile.",
      };
    case USER_LOGOUT_START:
      return {
        ...state,
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default userReducer;
