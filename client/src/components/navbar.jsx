import React from "react";
 
// We import bootstrap to make our application look better.
import 'bootstrap/dist/css/bootstrap.min.css';
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 
// Here, we display our Navbar
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink exact to="/" className="navbar-brand">Home</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/signup" className="nav-link" activeClassName="active">Sign Up</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/profile" className="nav-link" activeClassName="active">Profile</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/logout" className="nav-link" activeClassName="active">Logout</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;