import axios from "axios";
import { FETCH_SUCESSFUL } from "./TaskManagementTypes";
export const fetchUserTask = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:3000/userTasks");
    console.log(res);
    dispatch({ type: FETCH_SUCESSFUL, payload: res.data });
  } catch (err) {
    console.log(err);
  }

  // console.log("asdfasdfasdfasd");
};
