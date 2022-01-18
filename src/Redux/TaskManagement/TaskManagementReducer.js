import { FETCH_SUCESSFUL } from "./TaskManagementTypes";
const intialState = {
  data: null,
};
const TaskManagementReducer = (state = intialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_SUCESSFUL:
      return {
        ...state,
        data: payload,
      };
    default:
      return state;
  }
};

export default TaskManagementReducer;
