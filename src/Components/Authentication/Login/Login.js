import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../../Redux/Authentication/AuthenticationActions";
import styles from "./Login.module.css";
// import axios from "axios";
const Login = ({ state, loginUser }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const clearStateValues = () => {
    setEmail("");
    setPassword("");
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await loginUser({ email, password });
      clearStateValues();
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (state.isAuthenticated === true) {
      // window.open("/dashboard", "_self");
      history.push("/dashboard");
    }
  }, [state.isAuthenticated]);

  return (
    <div className={`${styles.loginPage} container`}>
      <form className={`${styles.loginForm}`} onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          {/* <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small> */}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        {/* <div className="form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div> */}
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
    loginUser: (data) => {
      dispatch(login(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
