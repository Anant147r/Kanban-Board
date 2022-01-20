import React, { useState, useEffect } from "react";
// import axios from "axios";
import { connect } from "react-redux";
import { register } from "../../../Redux/Authentication/AuthenticationActions";
import { useHistory } from "react-router-dom";
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
    // console.log("Hello32");
    // const res = await axios.post("http://localhost:3000/employees", {
    //   name,
    //   userName,
    //   email,
    //   number,
    //   password,
    // });
  };
  return (
    <div>
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
          {/* <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small> */}
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
          {/* <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small> */}
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail1">Email address*</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            required
          />
          {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
        </div>

        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="phone"
            className="form-control"
            id="contactNumber"
            placeholder="Contact Number"
            value={number}
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
    registerUser: (data) => {
      dispatch(register(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
// export default Register;
