import axios from "axios";
import { LOGIN_SUCCESS, REGISTER_SUCCESS, LOGOUT } from "./AuthenticationTypes";
// import { FETCH_SUCESSFUL } from "../TaskManagement/TaskManagementTypes";
import { BASE_URL } from "../../Assets/URL/URL";
export const login = (data) => async (dispatch) => {
  const { email, password } = data;
  try {
    const res = await axios.get(
      BASE_URL + "employees"
      // "http://localhost:3000/employees"
    );
    // console.log(isEmail);
    var isEmail;
    if (email.includes("@")) {
      // console.log(true);
      isEmail = true;
    } else {
      // console.log(false);
      isEmail = false;
    }

    const data = res.data;
    var count = 0;
    for (let item of data) {
      if (
        ((isEmail && item.email === email) ||
          (!isEmail && item.userName === email)) &&
        item.password === password
      ) {
        // console.log("User exists");
        dispatch({ type: LOGIN_SUCCESS, payload: item });
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
    const res1 = await axios.get(
      BASE_URL + `employees?email=${email}`
      // `http://localhost:3000/employees?email=${email}`
    );

    const res2 = await axios.get(
      BASE_URL + `employees?userName=${userName}`
      // `http://localhost:3000/employees?userName=${userName}`
    );
    // console.log(res1);
    if (res1.data.length !== 0) {
      // console.log("User already exists");
      alert(`User with email ${email} already exists`);
    } else if (res2.data.length !== 0) {
      alert(`User with username ${userName} already exists`);
    } else {
      const res = await axios.post(
        BASE_URL + "employees",
        // "http://localhost:3000/employees"
        {
          name,
          userName,
          email,
          number,
          password,
        }
      );
      console.log("Done");
      // console.log(res);
      alert("User has been successfully registered");
      // const userId = res.data.id;
      // console.log(userId);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data.id });
    }
  } catch (err) {
    console.log(err);
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};
