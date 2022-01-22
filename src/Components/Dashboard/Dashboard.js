import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";
import {
  fetchUserTask,
  addUserTask,
  updateUserTaskStage,
  deleteUserTask,
} from "../../Redux/TaskManagement/TaskManagementActions";
import { FETCH_USER_TASK } from "../../Redux/TaskManagement/TaskManagementTypes";
const Dashboard = ({
  tasks,
  activeUser,
  fetchUserTasks,
  addUserTask,
  updateUserTaskStage,
  deleteUserTask,
}) => {
  const history = useHistory();
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("");
  const [deadLine, setDeadline] = useState("");
  const [stage, setStage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userTasks, setUserTasks] = useState([]);
  const [val, setVal] = useState(1);
  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/userTasks?userId=${activeUser}`
      );
      setUserTasks(res.data);
      setLoading(false);
      return userTasks;
    } catch (err) {}
  };
  useEffect(() => {
    fetchTasks();
  }, [val, fetchUserTask]);
  const submitHandler = (event) => {
    event.preventDefault();
    addUserTask({ userId: activeUser, taskName, priority, deadLine, stage });
    setTaskName("");
    setPriority("");
    setDeadline("");
    setStage(0);
    fetchUserTask();
    setVal(val + 1);
    // history.push("/dashboard");
    // window.open("/dashboard");
  };
  const updateStage = (taskId, newStage) => {
    updateUserTaskStage(taskId, newStage);
    fetchUserTask();
    setVal(val + 1);
    // console.log("Hello");
    // history.push("/dashboard");
    // <Redirect to="/dashboard" />;
  };
  const deleteTask = (taskId) => {
    deleteUserTask(taskId);
    fetchUserTask();
    setVal(val + 1);
  };
  return (
    <div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          <h5>Add Task</h5>

          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="taskName">Task Name</label>
              <input
                type="text"
                className="form-control"
                id="taskName"
                aria-describedby="taskNameHelp"
                placeholder="Enter Task"
                value={taskName}
                onChange={(event) => {
                  setTaskName(event.target.value);
                }}
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
                value={priority}
                onChange={(event) => {
                  setPriority(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="deadline">Deadline</label>
              <input
                type="text"
                className="form-control"
                id="deadline"
                placeholder="Enter Deadline"
                value={deadLine}
                onChange={(event) => {
                  setDeadline(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="stage">Stage</label>
              <input
                type="number"
                className="form-control"
                id="stage"
                placeholder="Enter Stage"
                value={stage}
                onChange={(event) => {
                  setStage(event.target.value);
                }}
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
                {userTasks &&
                  userTasks.map((item, index) => {
                    if (item.stage == 0) {
                      return (
                        <li key={index}>
                          <div>Task Name</div>
                          <div>{item.taskName} </div>
                          <button className="btn btn-success disabled">
                            Previous
                          </button>{" "}
                          <button
                            className="btn btn-success"
                            onClick={() => {
                              updateStage(item.id, item.stage + 1);
                            }}
                          >
                            Next
                          </button>
                          <br />
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              deleteTask(item.id);
                            }}
                          >
                            Delete
                          </button>
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })}
              </ul>
            </div>
            <div>
              <div>To Do</div>
              <ul>
                {userTasks &&
                  userTasks.map((item, index) => {
                    if (item.stage == 1) {
                      return (
                        <li key={index}>
                          <div>Task Name</div>
                          <div>{item.taskName} </div>
                          <button
                            className="btn btn-success"
                            onClick={() => {
                              updateStage(item.id, item.stage - 1);
                            }}
                          >
                            Previous
                          </button>{" "}
                          <button
                            className="btn btn-success"
                            onClick={() => {
                              updateStage(item.id, item.stage + 1);
                            }}
                          >
                            Next
                          </button>{" "}
                          <br />
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              deleteTask(item.id);
                            }}
                          >
                            Delete
                          </button>
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })}
              </ul>
            </div>
            <div>
              <div>On Going</div>
              <ul>
                {userTasks &&
                  userTasks.map((item, index) => {
                    if (item.stage == 2) {
                      return (
                        <li key={index}>
                          <div>Task Name</div>
                          <div>{item.taskName} </div>
                          <button
                            className="btn btn-success"
                            onClick={() => {
                              updateStage(item.id, item.stage - 1);
                            }}
                          >
                            Previous
                          </button>{" "}
                          <button
                            className="btn btn-success"
                            onClick={() => {
                              updateStage(item.id, item.stage + 1);
                            }}
                          >
                            Next
                          </button>{" "}
                          <br />
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              deleteTask(item.id);
                            }}
                          >
                            Delete
                          </button>
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })}
              </ul>{" "}
            </div>
            <div>
              <div>Done</div>
              <ul>
                {userTasks &&
                  userTasks.map((item, index) => {
                    if (item.stage == 3) {
                      return (
                        <li key={index}>
                          <div>Task Name</div>
                          <div>{item.taskName} </div>
                          <button
                            className="btn btn-success"
                            onClick={() => {
                              updateStage(item.id, item.stage - 1);
                            }}
                          >
                            Previous
                          </button>{" "}
                          <button className="btn btn-success disabled">
                            Next
                          </button>{" "}
                          <br />
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              deleteTask(item.id);
                            }}
                          >
                            Delete
                          </button>
                        </li>
                      );
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
    fetchUserTasks: (activeUser) => {
      dispatch(fetchUserTask);
    },
    addUserTask: (data) => {
      dispatch(addUserTask(data));
    },
    updateUserTaskStage: (taskId, newStage) => {
      dispatch(updateUserTaskStage(taskId, newStage));
    },
    deleteUserTask: (taskId) => {
      dispatch(deleteUserTask(taskId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
