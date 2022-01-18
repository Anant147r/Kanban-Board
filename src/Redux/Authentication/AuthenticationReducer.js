// import React from "react";
import {
  REGISTER,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
} from "./AuthenticationTypes";
const intialState = {
  isAuthenticated: false,
  activeUser: null,
  loading: true,
  data: null,
};
const AuthenticationReducer = (state = intialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        activeUser: payload,
        loading: false,
        data: payload,
      };
    case REGISTER:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    default:
      return state;
  }
};

export default AuthenticationReducer;
