// import React from "react";
import {
  REGISTER,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT,
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
    // case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        activeUser: payload.id,
        loading: false,
        data: payload,
      };
    case REGISTER:
      return {
        ...state,
        loading: false,
        data: payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        activeUser: null,
        data: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default AuthenticationReducer;
