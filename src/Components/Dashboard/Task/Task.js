import React, { useState } from "react";
import styles from "./Task.module.css";
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
  };
  const [newTaskName, setNewTaskName] = useState("");
  const [newPriority, setNewPriority] = useState("low");
  const [newDeadLine, setNewDeadLine] = useState("");
  return (
    <div
      className={`${styles.task} container`}
      style={{
        border: "1px solid #CED4DA",
        textAlign: "center",
        padding: "1rem",
        borderRadius: "10px",
      }}
    >
      <div className={`${styles.taskName}`}>
        <span>Task Name - </span>
        <span style={{ fontWeight: "600" }}>{taskName} </span>
      </div>
      <div className={`${styles.taskPriority}`}>
        <span>Priority - </span>
        <span style={{ fontWeight: "600" }}>{priority}</span>
      </div>
      <div className={`${styles.taskDeadline}`}>
        <span>Deadline - </span>
        <span style={{ fontWeight: "600" }}>{deadline}</span>
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
        class="modal fade"
        id={`newUserDetails${taskId}`}
        tabindex="-1"
        role="dialog"
        aria-labelledby={`newUserDetails${taskId}Title`}
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Enter new user details
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  clearUserDetailsFromForm();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
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
                <div class="form-group" style={{ textAlign: "left" }}>
                  <label for="newTaskName">Task Name</label>
                  <input
                    type="text"
                    class="form-control"
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
                <div class="form-group" style={{ textAlign: "left" }}>
                  <label for="newPriority">Priority</label>
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
                <div class="form-group" style={{ textAlign: "left" }}>
                  <label for="newDeadline">Deadline</label>
                  <input
                    type="date"
                    class="form-control"
                    id="newDeadline"
                    placeholder="Enter new deadline"
                    value={newDeadLine}
                    onChange={(event) => {
                      setNewDeadLine(event.target.value);
                    }}
                    required
                  />
                </div>

                <button type="submit" class="btn btn-primary">
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
