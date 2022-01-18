import axios from "axios";
export const fetchUserTask =
  ({ userId }) =>
  async (dispatch) => {
    const res = await axios.get("http://localhost:3000/userTasks");
    console.log(res);
  };
