import axios from "axios";
import { FETCH_SUCESSFUL } from "./TaskManagementTypes";
export const fetchUserTask = async (dispatch) => {
  const res = await axios.get("http://localhost:3000/userTasks");
  console.log("asdfasdfasdfasd");

  dispatch({ type: FETCH_SUCESSFUL, payload: res.data });
};
