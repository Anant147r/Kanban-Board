import AuthenticationReducer from "./Authentication/AuthenticationReducer";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  AuthenticationReducer,
});

export default rootReducer;
