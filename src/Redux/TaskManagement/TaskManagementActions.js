import axios from "axios";
import { FETCH_USER_TASK, FETCH_SUCESSFUL } from "./TaskManagementTypes";
export const fetchUserTask = (activeUser) => async (dispatch) => {
  // console.log("asdfasdf");
  try {
    dispatch({ type: FETCH_USER_TASK });
    const res = await axios.get(
      `http://localhost:3000/userTasks?userId=${activeUser}`
    );
    dispatch({ type: FETCH_SUCESSFUL, payload: res.data });
    // console.log(res);
    // return res.data;
  } catch (err) {
    console.log(err);
  }

  // console.log("asdfasdfasdfasd");
};

export const addUserTask = (data) => async (dispatch) => {
  try {
    const res = axios.post(
      "http://localhost:3000/userTasks",
      //  { userId:data.userId,taskName:data.taskName,priority:data.priority,deadline:data.deadline,stage:data.stage }
      { ...data }
    );
  } catch (err) {
    console.log(err);
  }
};

export const updateUserTaskStage = (taskId, newStage) => async (dispatch) => {
  try {
    await axios.patch(`http://localhost:3000/userTasks/${taskId}`, {
      stage: newStage,
    });
    // const res=await axios.get("htt")
    console.log("done");
  } catch (err) {
    console.log(err);
  }
};
