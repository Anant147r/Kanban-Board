import { FETCH_SUCESSFUL } from "./TaskManagementTypes";
const intialState = {
  loading: true,
  tasks: null,
};
const TaskManagementReducer = (state = intialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_SUCESSFUL:
      return {
        ...state,
        loading: false,
        tasks: payload,
      };
    default:
      return state;
  }
};

export default TaskManagementReducer;
