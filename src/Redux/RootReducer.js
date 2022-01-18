import AuthenticationReducer from "./Authentication/AuthenticationReducer";
import TaskManagementReducer from "./TaskManagement/TaskManagementReducer";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  AuthenticationReducer,
  TaskManagementReducer,
});

export default rootReducer;
