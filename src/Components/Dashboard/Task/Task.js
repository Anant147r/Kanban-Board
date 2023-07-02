import React, { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import styles from "./Task.module.css";
import styles2 from "../Dashboard.module.css";
import {
  updateUserTaskStage,
  deleteUserTask,
  fetchUserTask,
  updateUserStageDetails,
} from "../../../Redux/TaskManagement/TaskManagementActions";
import { connect } from "react-redux";
const Task = ({
  taskName,
  priority,
  deadline,
  stage,
  taskId,
  updateUserTaskStage,
  deleteUserTask,
  incrementValue,
  updateUserStageDetails,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { taskId: taskId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    if (isDragging === true)
      document.querySelector(`.${styles2.trashCan}`).style["visibility"] =
        "visible";
    else
      document.querySelector(`.${styles2.trashCan}`).style["visibility"] =
        "hidden";
  }, [isDragging]);
  const updateStage = (taskId, newStage) => {
    updateUserTaskStage(taskId, newStage);
    fetchUserTask();
    // setVal(val + 1);
    incrementValue();
  };
  const deleteTask = (taskId) => {
    deleteUserTask(taskId);
    fetchUserTask();
    // setVal(val + 1);
    incrementValue();
  };
  const updateUserDetails = (taskId, newUserDetails) => {
    updateUserStageDetails(taskId, newUserDetails);
    fetchUserTask();
    incrementValue();
    clearUserDetailsFromForm();
  };
  const clearUserDetailsFromForm = () => {
    setNewTaskName("");
    setNewPriority("low");
    setNewDeadLine("");
    fetchUserTask();
    incrementValue();
    // document.querySelector(".updateUserDetailClose").click();
  };
  const [newTaskName, setNewTaskName] = useState("");
  const [newPriority, setNewPriority] = useState("low");
  const [newDeadLine, setNewDeadLine] = useState("");
  return (
    <div
      className={`${styles.task} container`}
      ref={drag}
      style={{ border: isDragging ? "5px solid red" : "1px solid #ced4da" }}
    >
      <div className={`${styles.taskName} ${styles.taskDetail}`}>
        <span>Task Name - </span>
        <span className={styles.taskDetailText}>{taskName} </span>
      </div>
      <div className={`${styles.taskPriority} ${styles.taskDetail}`}>
        <span>Priority - </span>
        <span className={styles.taskDetailText}>{priority}</span>
      </div>
      <div className={`${styles.taskDeadline} ${styles.taskDetail}`}>
        <span>Deadline - </span>
        <span className={styles.taskDetailText}>{deadline}</span>
      </div>
      <button
        // className={`btn btn-success ${!prev ? "disabled" : ""}`}
        className={`${styles.button} btn btn-success`}
        disabled={stage == 0 ? true : false}
        onClick={() => {
          updateStage(taskId, parseInt(stage) - 1);
        }}
      >
        Previous
      </button>
      <br></br>
      <button
        // className={`btn btn-success ${!next ? "disabled" : ""}`}
        className={`${styles.button} btn btn-success`}
        disabled={stage == 3 ? true : false}
        onClick={() => {
          updateStage(taskId, parseInt(stage) + 1);
        }}
      >
        Next
      </button>
      <br />
      <button
        // className={`btn btn-success ${!next ? "disabled" : ""}`}
        className={`${styles.button} btn btn-success`}
        data-toggle="modal"
        data-target={`#newUserDetails${taskId}`}
        onClick={() => {
          // console.log(taskId);
        }}
      >
        Edit
      </button>

      <div
        className="modal fade"
        id={`newUserDetails${taskId}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby={`newUserDetails${taskId}Title`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Enter new user details
              </h5>
              <button
                type="button"
                className="close updateUserDetailClose"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  clearUserDetailsFromForm();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  // console.log(taskId);
                  updateUserDetails(taskId, {
                    taskName: newTaskName,
                    priority: newPriority,
                    deadLine: newDeadLine,
                  });
                }}
              >
                <div className="form-group" style={{ textAlign: "left" }}>
                  <label htmlFor="newTaskName">
                    <h5>Task Name</h5>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="newTaskName"
                    aria-describedby="newTaskNameHelp"
                    placeholder="Enter new task name"
                    value={newTaskName}
                    onChange={(event) => {
                      setNewTaskName(event.target.value);
                    }}
                    required
                  />
                </div>
                <br></br>
                <div className="form-group" style={{ textAlign: "left" }}>
                  <label htmlFor="newPriority">
                    {" "}
                    <h5>Priority</h5>{" "}
                  </label>
                  <br></br>
                  <select
                    value={newPriority}
                    onChange={(event) => {
                      setNewPriority(event.target.value);
                    }}
                  >
                    <option>low</option>
                    <option>medium</option>
                    <option>high</option>
                  </select>
                </div>
                <br></br>
                <div className="form-group" style={{ textAlign: "left" }}>
                  <label htmlFor="newDeadline">
                    <h5>Deadline</h5>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="newDeadline"
                    placeholder="Enter new deadline"
                    value={newDeadLine}
                    onChange={(event) => {
                      setNewDeadLine(event.target.value);
                    }}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <br />
      <button
        className={`${styles.button} btn btn-danger`}
        onClick={() => {
          deleteTask(taskId);
        }}
      >
        Delete
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserTaskStage: (taskId, newStage) => {
      dispatch(updateUserTaskStage(taskId, newStage));
    },
    deleteUserTask: (taskId) => {
      dispatch(deleteUserTask(taskId));
    },
    updateUserStageDetails: (taskId, newUserDetails) => {
      dispatch(updateUserStageDetails(taskId, newUserDetails));
    },
  };
};

export default connect(null, mapDispatchToProps)(Task);
