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
  prev,
  next,
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
    <div className={`${styles.task}`}>
      <div>Task Name</div>
      <div>{taskName} </div>
      <button
        // className={`btn btn-success ${!prev ? "disabled" : ""}`}
        className="btn btn-success"
        disabled={stage == 0 ? true : false}
        onClick={() => {
          updateStage(taskId, parseInt(stage) - 1);
        }}
      >
        Previous
      </button>{" "}
      <button
        // className={`btn btn-success ${!next ? "disabled" : ""}`}
        className="btn btn-success"
        disabled={stage == 3 ? true : false}
        onClick={() => {
          updateStage(taskId, parseInt(stage) + 1);
        }}
      >
        Next
      </button>
      <br />
      <button
        className="btn btn-danger"
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
