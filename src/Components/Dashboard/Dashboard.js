import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
// import { useHistory, Redirect } from "react-router-dom";
import Task from "./Task/Task";
import {
  fetchUserTask,
  addUserTask,
  updateUserTaskStage,
  deleteUserTask,
} from "../../Redux/TaskManagement/TaskManagementActions";
import { useHistory } from "react-router-dom";
// import { FETCH_USER_TASK } from "../../Redux/TaskManagement/TaskManagementTypes";
import { BASE_URL } from "../../Assets/URL/URL";
import styles from "./Dashboard.module.css";
const Dashboard = ({
  userName,
  activeUser,
  addUserTask,
  isAuthenticated,
  updateUserTaskStage,
  deleteUserTask,
}) => {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("low");
  const [deadLine, setDeadline] = useState("");
  const [stage, setStage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userTasks, setUserTasks] = useState([]);
  const [val, setVal] = useState(1);
  const history = useHistory();
  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        BASE_URL + `userTasks?userId=${activeUser}`
        // `http://localhost:3000/userTasks?userId=${activeUser}`
      );
      setUserTasks(res.data);
      setLoading(false);
      return userTasks;
    } catch (err) {}
  };
  useEffect(() => {
    // console.log(userInfo);
    fetchTasks();
  }, [val, fetchUserTask]);

  useEffect(() => {
    if (!isAuthenticated) history.push("/");
  }, []);
  const submitHandler = (event) => {
    event.preventDefault();
    addUserTask({ userId: activeUser, taskName, priority, deadLine, stage });
    setTaskName("");
    setPriority("");
    setDeadline("");
    setStage(0);
    fetchUserTask();
    setVal(val + 1);
    alert("Your task has been added");
    // history.push("/dashboard");
    // window.open("/dashboard");
  };
  const incrementValue = () => {
    setVal(val + 1);
  };

  return (
    <div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div
          className={`${styles.dashboard} container`}
          style={{ border: "1px solid #D2D8DD", borderRadius: "10px" }}
        >
          <h3
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              marginTop: "2rem",
            }}
          >
            Welcome {userName ? userName : ""}
          </h3>
          <button
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#taskForm"
            style={{
              // border: "1px solid black",
              display: "block",
              margin: "0 auto",
              marginBottom: "2rem",
            }}
          >
            Add A New Task
          </button>
          {userTasks.length == 0 ? (
            <h4 style={{ textAlign: "center" }}>
              Your task list is empty. Click on ADD A NEW TASK button to add a
              task
            </h4>
          ) : (
            <div
              className={`${styles.tasks}`}
              // style={{ border: "1px solid black" }}
            >
              <div>
                <h3 className={`${styles.heading}`}>Backlog</h3>
                <div>
                  {userTasks &&
                    userTasks.map((item, index) => {
                      if (item.stage == 0) {
                        return (
                          <div key={index}>
                            <Task
                              taskName={item.taskName}
                              priority={item.priority}
                              deadline={item.deadLine}
                              stage={item.stage}
                              taskId={item.id}
                              incrementValue={() => {
                                incrementValue();
                              }}
                            />
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })}
                </div>
              </div>
              <div>
                <h3 className={`${styles.heading}`}>To Do</h3>
                <div>
                  {userTasks &&
                    userTasks.map((item, index) => {
                      if (item.stage == 1) {
                        return (
                          <div key={index}>
                            <Task
                              taskName={item.taskName}
                              priority={item.priority}
                              deadline={item.deadLine}
                              stage={item.stage}
                              taskId={item.id}
                              incrementValue={() => {
                                incrementValue();
                              }}
                            />
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })}
                </div>
              </div>
              <div>
                <h3 className={`${styles.heading}`}>On Going</h3>
                <div>
                  {userTasks &&
                    userTasks.map((item, index) => {
                      if (item.stage == 2) {
                        return (
                          <div key={index}>
                            <Task
                              taskName={item.taskName}
                              priority={item.priority}
                              deadline={item.deadLine}
                              stage={item.stage}
                              taskId={item.id}
                              incrementValue={() => {
                                incrementValue();
                              }}
                            />
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })}
                </div>{" "}
              </div>
              <div>
                <h3 className={`${styles.heading}`}>Done</h3>
                <div>
                  {userTasks &&
                    userTasks.map((item, index) => {
                      if (item.stage == 3) {
                        return (
                          <div key={index}>
                            <Task
                              taskName={item.taskName}
                              priority={item.priority}
                              deadline={item.deadLine}
                              stage={item.stage}
                              taskId={item.id}
                              incrementValue={() => {
                                incrementValue();
                              }}
                            />
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })}
                </div>
              </div>
            </div>
          )}

          {/* <div></div> */}

          {/* ADD A NEW TASK */}

          <div
            className="modal fade"
            id="taskForm"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="taskFormTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Welcome To The Task Form
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
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
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="priority">Priority</label>

                      <select
                        value={priority}
                        onChange={(event) => {
                          setPriority(event.target.value);
                        }}
                      >
                        <option>low</option>
                        <option>medium</option>
                        <option>high</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="deadline">Deadline</label>
                      <input
                        type="date"
                        className="form-control"
                        id="deadline"
                        placeholder="Enter Deadline"
                        value={deadLine}
                        onChange={(event) => {
                          setDeadline(event.target.value);
                        }}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">
                      ADD TASK
                    </button>
                    <button
                      style={{ marginLeft: "1rem" }}
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </form>
                </div>
                <div className="modal-footer"></div>
              </div>
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
    userName: state.AuthenticationReducer.data
      ? state.AuthenticationReducer.data.name
      : null,
    tasks: state.TaskManagementReducer.tasks,
    activeUser: state.AuthenticationReducer.activeUser,
    isAuthenticated: state.AuthenticationReducer.isAuthenticated,
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
