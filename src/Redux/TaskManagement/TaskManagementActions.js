import axios from "axios";
import { FETCH_USER_TASK, FETCH_SUCESSFUL } from "./TaskManagementTypes";
import { BASE_URL } from "../../Assets/URL/URL";
export const fetchUserTask = (activeUser) => async (dispatch) => {
  try {
    const res = await axios.get(BASE_URL + `userTasks?userId=${activeUser}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const addUserTask = (data) => async (dispatch) => {
  try {
    const res = axios.post(BASE_URL + "userTasks", { ...data });
  } catch (err) {
    console.log(err);
  }
};

export const updateUserTaskStage = (taskId, newStage) => async (dispatch) => {
  try {
    await axios.patch(BASE_URL + `userTasks/${taskId}`, {
      stage: newStage,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteUserTask = (taskId) => async (dispatch) => {
  try {
    await axios.delete(BASE_URL + `userTasks/${taskId}`);
    console.log("Task Deleted");
  } catch (err) {
    console.log(err);
  }
};

export const updateUserStageDetails =
  (taskId, newDetails) => async (dispatch) => {
    try {
      await axios.patch(BASE_URL + `userTasks/${taskId}`, {
        taskName: newDetails.taskName,
        priority: newDetails.priority,
        deadLine: newDetails.deadLine,
      });
    } catch (err) {
      console.log(err);
    }
  };
