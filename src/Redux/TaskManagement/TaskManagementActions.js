import axios from "axios";
// import { FETCH_SUCESSFUL } from "./TaskManagementTypes";
export const fetchUserTask = (activeUser) => async (dispatch) => {
  console.log("asdfasdf");
  try {
    const res = await axios.get("http://localhost:3000/userTasks");
    console.log(res);

    res.data.forEach((item, index) => {
      if (item.userId === activeUser) {
        // console.log(item.tasks);
        // return item.tasks;
        // console.log(item.tasks);
        // item.tasks.forEach((task, index) => {
        //   if (task.stage === 0) {
        //     setBacklog([...backlog, task.taskName]);
        //   } else if (task.stage === 1) {
        //     setToDo([...toDo, task.taskName]);
        //   } else if (task.stage === 2) {
        //     setOnGoing([...onGoing, task.taskName]);
        //   } else if (task.stage === 3) {
        //     setDone([...done, task.taskName]);
        //   }
        // });
      }
      // else return -1;
    });
    // dispatch({ type: FETCH_SUCESSFUL, payload: res.data });
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
