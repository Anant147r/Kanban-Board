import axios from "axios";
import { FETCH_USER_TASK, FETCH_SUCESSFUL } from "./TaskManagementTypes";
import { BASE_URL } from "../../Assets/URL/URL";
export const fetchUserTask = (activeUser) => async (dispatch) => {
  // console.log("asdfasdf");
  try {
    // dispatch({ type: FETCH_USER_TASK });
    const res = await axios.get(
      BASE_URL + `userTasks?userId=${activeUser}`
      // `http://localhost:3000/userTasks?userId=${activeUser}`
    );
    return res.data;
    // dispatch({ type: FETCH_SUCESSFUL, payload: res.data });
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
      // "http://localhost:3000/userTasks",
      BASE_URL + "userTasks",
      //  { userId:data.userId,taskName:data.taskName,priority:data.priority,deadline:data.deadline,stage:data.stage }
      { ...data }
    );
  } catch (err) {
    console.log(err);
  }
};

export const updateUserTaskStage = (taskId, newStage) => async (dispatch) => {
  try {
    await axios.patch(
      BASE_URL + `userTasks/${taskId}`,
      // `http://localhost:3000/userTasks/${taskId}`
      {
        stage: newStage,
      }
    );
    // const res=await axios.get("htt")
    // console.log("done");
  } catch (err) {
    console.log(err);
  }
};

export const deleteUserTask = (taskId) => async (dispatch) => {
  try {
    await axios.delete(
      BASE_URL + `userTasks/${taskId}`
      // `http://localhost:3000/userTasks/${taskId}`
    );
    console.log("Task Deleted");
  } catch (err) {
    console.log(err);
  }
};

export const updateUserStageDetails =
  (taskId, newDetails) => async (dispatch) => {
    try {
      await axios.patch(
        BASE_URL + `userTasks/${taskId}`,
        // `http://localhost:3000/userTasks/${taskId}`
        {
          taskName: newDetails.taskName,
          priority: newDetails.priority,
          deadLine: newDetails.deadLine,
        }
      );
      // const res=await axios.get("htt")
      // console.log("done");
    } catch (err) {
      console.log(err);
    }
  };
