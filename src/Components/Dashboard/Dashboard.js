import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { fetchUserTask } from "../../Redux/TaskManagement/TaskManagementActions";
import { FETCH_USER_TASK } from "../../Redux/TaskManagement/TaskManagementTypes";
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
  const [userTasks, setUserTasks] = useState([]);
  // const backlog = [];
  // const toDo = [];
  // const onGoing = [];
  // const done = [];
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/userTasks");
      res.data.forEach((item, index) => {
        if (item.userId == activeUser) {
          setUserTasks(item.tasks);
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
      });
      setLoading(false);
    } catch (err) {}
  };
  // fetchTasks();
  // fetchTasks();
  useEffect(() => {
    // console.log(tasks);
    fetchTasks();
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          <h5>Add Task</h5>

          <form>
            <div className="form-group">
              <label htmlFor="taskName">Task Name</label>
              <input
                type="text"
                className="form-control"
                id="taskName"
                aria-describedby="taskNameHelp"
                placeholder="Enter Task"
              />
              {/* <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small> */}
            </div>
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <input
                type="text"
                className="form-control"
                id="priority"
                placeholder="Enter Priotrity"
              />
            </div>
            <div className="form-group">
              <label htmlFor="deadline">Deadline</label>
              <input
                type="text"
                className="form-control"
                id="deadline"
                placeholder="Enter Deadline"
              />
            </div>
            {/* <div className="form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div> */}
            <button type="submit" className="btn btn-primary">
              ADD TASK
            </button>
          </form>

          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}
          >
            <div>
              <div>Backlog</div>
              <ul>
                {userTasks.map((item, index) => {
                  if (item.stage === 0) {
                    return <li key={index}>{item.taskName}</li>;
                  } else {
                    return null;
                  }
                })}
              </ul>
            </div>
            <div>
              <div>To Do</div>
              <ul>
                {userTasks.map((item, index) => {
                  if (item.stage === 1) {
                    return <li key={index}>{item.taskName}</li>;
                  } else {
                    return null;
                  }
                })}
              </ul>
            </div>
            <div>
              <div>On Going</div>
              <ul>
                {userTasks.map((item, index) => {
                  if (item.stage === 2) {
                    return <li key={index}>{item.taskName}</li>;
                  } else {
                    return null;
                  }
                })}
              </ul>{" "}
            </div>
            <div>
              <div>Done</div>
              <ul>
                {userTasks.map((item, index) => {
                  if (item.stage === 3) {
                    return <li key={index}>{item.taskName}</li>;
                  } else {
                    return null;
                  }
                })}
              </ul>
            </div>
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
