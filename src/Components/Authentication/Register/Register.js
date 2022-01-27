import React, { useState, useEffect } from "react";
// import axios from "axios";
import { connect } from "react-redux";
import { register } from "../../../Redux/Authentication/AuthenticationActions";
import { useHistory } from "react-router-dom";
import styles from "./Register.module.css";
const Register = ({ state, registerUser }) => {
  const history = useHistory();
  // useEffect(() => {
  //   if (state.isAuthenticated === true) {
  //     history.push("/dashboard");
  //   }
  // }, [state.isAuthenticated]);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  const clearStateValues = () => {
    setName("");
    setUserName("");
    setEmail("");
    setNumber("");
    setPassword("");
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const res = await registerUser({ name, userName, email, number, password });
    clearStateValues();
  };
  return (
    <div className={`${styles.registerForm} container`}>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name">Name*</label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="nameHelp"
            placeholder="Enter Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userName">User Name*</label>
          <input
            type="username"
            className="form-control"
            id="username"
            aria-describedby="usernameHelp"
            placeholder="Enter User Name"
            value={userName}
            onChange={(event) => {
              setUserName(event.target.value);
            }}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail1">Email address*</label>
          <input
            // type="email"
            className="form-control"
            id="inputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            pattern="[A-Za-z0-9]{1,}@[A-Za-z]{1,}\.[a-z]{1,}"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            title="Please enter a valid email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="tel"
            className="form-control"
            id="contactNumber"
            placeholder="Contact Number"
            value={number}
            pattern="[6789][0-9]{9}"
            onChange={(event) => {
              setNumber(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword1"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    state: state.AuthenticationReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (data) => {
      dispatch(register(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
// export default Register;
