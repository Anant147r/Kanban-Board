import axios from "axios";
import { LOGIN, REGISTER } from "./AuthenticationTypes";
// import { REGISTER } from "./AuthenticationTypes";

export const login = (data) => async (dispatch) => {
  const { email, password } = data;
  try {
    const res = await axios.get("http://localhost:3000/employees");
    console.log(res);
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
    dispatch({ type: REGISTER, payload: res });
  } catch (err) {}
};
