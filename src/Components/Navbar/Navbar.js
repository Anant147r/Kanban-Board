import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../Redux/Authentication/AuthenticationActions";

const Navbar = ({ isAnyUserLoggedIn, logout }) => {
  const history = useHistory();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="navbar-brand" href="/#">
        <NavLink to="/" style={{ color: "black" }}>
          Kanban Board
        </NavLink>
      </span>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse " id="navbarNavDropdown">
        <ul className="navbar-nav ml-auto">
          {isAnyUserLoggedIn ? null : (
            <>
              {" "}
              <li className="nav-item active">
                <span className="nav-link" href="/#">
                  <NavLink to="/" style={{ color: "black" }}>
                    Login
                  </NavLink>
                </span>
              </li>
              <li className="nav-item">
                <span className="nav-link" href="/#">
                  <NavLink to="/register" style={{ color: "black" }}>
                    {" "}
                    Register
                  </NavLink>
                </span>
              </li>
            </>
          )}

          {isAnyUserLoggedIn ? (
            <li className="nav-item">
              <span className="nav-link" href="/#">
                <NavLink
                  to="/register"
                  style={{ color: "black" }}
                  onClick={(event) => {
                    event.preventDefault();
                    logout();
                    history.push("/");
                  }}
                >
                  {" "}
                  Logout
                </NavLink>
              </span>
            </li>
          ) : null}

          {/* <li className="nav-item">
            
          <a className="nav-link" href="#">
          <NavLink></NavLink>    Pricing
            </a>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    isAnyUserLoggedIn: state.AuthenticationReducer.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
