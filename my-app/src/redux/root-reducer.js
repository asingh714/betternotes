import { combineReducers } from "redux";

import userReducer from "./reducers/user.reducers";
import notesReducer from "./reducers/note.reducers";
import cartReducer from "./reducers/cart.reducers";

const rootReducer = combineReducers({
  user: userReducer,
  notes: notesReducer,
  cart: cartReducer,
});

export default rootReducer;
