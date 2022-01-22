import { FETCH_SUCESSFUL, FETCH_USER_TASK } from "./TaskManagementTypes";
const intialState = {
  loading: true,
  activeUserTasks: null,
};
const TaskManagementReducer = (state = intialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_USER_TASK:
      return {
        ...state,
        loading: true,
        // tasks: payload,
      };
    case FETCH_SUCESSFUL:
      return {
        ...state,
        loading: false,
        activeUserTasks: payload,
      };
    default:
      return state;
  }
};

export default TaskManagementReducer;
