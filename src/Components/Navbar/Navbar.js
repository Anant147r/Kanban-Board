import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="navbar-brand" href="/#">
        <NavLink to="/">Navbar</NavLink>
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
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <span className="nav-link" href="/#">
              <NavLink to="/">Login</NavLink>
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-link" href="/#">
              <NavLink to="/register"> Register</NavLink>
            </span>
          </li>
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

export default Navbar;
