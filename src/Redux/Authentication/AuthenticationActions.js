import axios from "axios";
import {
  // LOGIN,
  LOGIN_SUCCESS,
  // REGISTER,
  REGISTER_SUCCESS,
} from "./AuthenticationTypes";
// import { fetchUserTask } from "../TaskManagement/TaskManagementActions";
import { FETCH_SUCESSFUL } from "../TaskManagement/TaskManagementTypes";
// import { FETCH_USER_TASKS } from "../TaskManagement/TaskManagementTypes";
// import { FETCH_USER_TASKS } from "../TaksManagement/TaskManagementTypes";
// import { REGISTER } from "./AuthenticationTypes";
// import fsdf from
export const login = (data) => async (dispatch) => {
  const { email, password } = data;
  try {
    const res = await axios.get("http://localhost:3000/employees");
    // window.open("http://localhost:3000/userTasks", "_blank");
    // console.log(res);
    const data = res.data;
    var count = 0;
    for (let item of data) {
      if (item.email === email && item.password === password) {
        console.log("User exists");
        dispatch({ type: LOGIN_SUCCESS, payload: item.id });

        const taskResponse = await axios.get("http://localhost:3000/userTasks");

        dispatch({ type: FETCH_SUCESSFUL, payload: taskResponse.data });
      } else count++;
    }
    if (count === res.data.length) console.log("User do not exists");
  } catch (err) {
    console.log(err);
  }
};

export const register = (data) => async (dispatch) => {
  const { name, userName, email, number, password } = data;
  // console.log(data);
  // console.log("Hello");
  try {
    const res = await axios.post("http://localhost:3000/employees", {
      name,
      userName,
      email,
      number,
      password,
    });
    console.log("Done");
    console.log(res);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data.id });
    window.open("/dashboard", "_self");
  } catch (err) {}
};
