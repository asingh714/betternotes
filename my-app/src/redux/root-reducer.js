import { combineReducers } from "redux";

import userReducer from "../redux/reducers/user.reducers";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
