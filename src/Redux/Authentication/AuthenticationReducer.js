// import React from "react";
import { REGISTER } from "./AuthenticationTypes";
const intialState = {
  loading: true,
  data: null,
};
const AuthenticationReducer = (state = intialState, action) => {
  const { type, payload } = action;
  switch (type) {
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
