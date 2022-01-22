import React from "react";
import styles from "./Task.module.css";
import {
  updateUserTaskStage,
  deleteUserTask,
  fetchUserTask,
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
  };
};

export default connect(null, mapDispatchToProps)(Task);
