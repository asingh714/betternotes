import { combineReducers } from "redux";

import userReducer from "../redux/reducers/user.reducers";
import notesReducer from "./reducers/note.reducers";

const rootReducer = combineReducers({
  user: userReducer,
  notes: notesReducer,
});

export default rootReducer;
