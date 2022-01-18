import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { fetchUserTask } from "../../Redux/TaskManagement/TaskManagementActions";
import { FETCH_SUCESSFUL } from "../../Redux/TaskManagement/TaskManagementTypes";
const Dashboard = ({
  tasks,
  activeUser,
  fetchUserTasks,
  // loading,
  dispatch,
}) => {
  const [backlog, setBacklog] = useState([]);
  const [toDo, setToDo] = useState([]);
  const [onGoing, setOnGoing] = useState([]);
  const [done, setDone] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    // fetchUserTasks();

    // console.log(tasks);
    try {
      const res = await axios.get("http://localhost:3000/userTasks");
      console.log(res.data);

      // console.log(res.data);
      // dispatch({ type: FETCH_SUCESSFUL, payload: res.data });
      // res.data.forEach((task, index) => {
      //   if (task.userId == activeUser) {
      //     setBacklog(task.tasks.backlog);
      //     setToDo(task.tasks.toDo);
      //     setOnGoing(task.tasks.onGoing);
      //     setDone(task.tasks.done);
      //   }
      // });

      setToDo(["asdfa", "asdf", "asdfasdf", "asdfadf"]);

      setBacklog(["asd", "asdsdfasdf", "asdfasd"]);
      setOnGoing(["asdfa", "asdf"]);
      setDone(["asdf", "asdfasd"]);
      setLoading(false);
      // console.log(backlog);
    } catch (err) {}
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          <div>
            <div>Backlog</div>
            <ul>
              {backlog.map((item, index) => {
                return <li>{item}</li>;
              })}
            </ul>
          </div>
          <div>
            <div>To Do</div>
            <ul>
              {toDo.map((item, index) => {
                return <li>{item}</li>;
              })}
            </ul>
          </div>
          <div>
            <div>On Going</div>
            <ul>
              {onGoing.map((item, index) => {
                return <li>{item}</li>;
              })}
            </ul>{" "}
          </div>
          <div>
            <div>Done</div>
            <ul>
              {done.map((item, index) => {
                return <li>{item}</li>;
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    // tasks: state.TaskManagementReducer,
    // loading: state.TaskManagementReducer.loading,
    tasks: state.TaskManagementReducer.tasks,
    activeUser: state.AuthenticationReducer.activeUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserTasks: () => {
      dispatch(fetchUserTask);
    },
    dispatch: () => {
      dispatch();
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
