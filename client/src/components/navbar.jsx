import React from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink exact to="/" className="navbar-brand">
        Home
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={() => console.log(document.querySelector("#navbarNav"))}
        >
      
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink
              to="/login"
              className="nav-link"
              activeClassName="active"
            >
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/signup"
              className="nav-link"
              activeClassName="active"
            >
              Sign Up
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/profile"
              className="nav-link"
              activeClassName="active"
            >
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/logout"
              className="nav-link"
              activeClassName="active"
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
