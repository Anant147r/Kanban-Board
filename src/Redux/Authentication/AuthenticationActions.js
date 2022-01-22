import axios from "axios";
import { LOGIN_SUCCESS, REGISTER_SUCCESS, LOGOUT } from "./AuthenticationTypes";
// import { FETCH_SUCESSFUL } from "../TaskManagement/TaskManagementTypes";

export const login = (data) => async (dispatch) => {
  const { email, password } = data;
  try {
    const res = await axios.get("http://localhost:3000/employees");
    const data = res.data;
    var count = 0;
    for (let item of data) {
      if (item.email === email && item.password === password) {
        console.log("User exists");
        dispatch({ type: LOGIN_SUCCESS, payload: item.id });
        // const taskResponse = await axios.get("http://localhost:3000/userTasks");
        // dispatch({ type: FETCH_SUCESSFUL, payload: taskResponse.data });
      } else count++;
    }
    if (count === res.data.length) alert("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};

export const register = (data) => async (dispatch) => {
  // const history = useHistory();
  const { name, userName, email, number, password } = data;
  try {
    const res = await axios.post("http://localhost:3000/employees", {
      name,
      userName,
      email,
      number,
      password,
    });
    console.log("Done");
    // console.log(res);
    const userId = res.data.id;
    // console.log(userId);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data.id });

    // try {
    //   const resUser = await axios.post("http://localhost:3000/userTasks", {
    //     userId: 1,
    //     // taskName: backlog4,
    //     // "priority": "",
    //     // "deadline": "",
    //     // "stage": 0,
    //     // "id": 1
    //   });
    //   // console.log(resUser);
    // } catch (err) {}

    // window.open("/dashboard", "_self");
    // history.push("/dashboard");
  } catch (err) {}
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};
