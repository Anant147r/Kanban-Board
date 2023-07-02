import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../../Redux/Authentication/AuthenticationActions";
import styles from "./Login.module.css";
const Login = ({ state, loginUser }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const clearStateValues = () => {
    setEmail("");
    setPassword("");
    // setIsEmail(false);
  };
  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await loginUser({ email, password });
      clearStateValues();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (state.isAuthenticated === true) {
      history.push("/dashboard");
    }
  }, [state.isAuthenticated]);

  return (
    <div className={`${styles.loginPage} container`}>
      <form className={`${styles.loginForm}`} onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email Address/Username</label>
          <input
            className="form-control input"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email or username"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control input"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
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
    loginUser: (data) => {
      dispatch(login(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
