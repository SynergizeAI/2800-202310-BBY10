import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function CustomNavbar({ loggedIn, setLoggedIn }) {
  useEffect(() => {
    const checkLoggedIn = async () => {
      const response = await fetch("/api/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    };
    checkLoggedIn();
  }, [loggedIn, setLoggedIn]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <NavLink exact to="/" className="navbar-brand">
          Home
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {!loggedIn && (
              <>
                <Nav.Item>
                  <NavLink
                    to="/login"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Login
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink
                    to="/signup"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Sign Up
                  </NavLink>
                </Nav.Item>
              </>
            )}
            {loggedIn && (
              <>
                <Nav.Item>
                  <NavLink
                    to="/joinchat"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Join Chat
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink
                    to="/createspace"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Create Chat
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink
                    to="/profile"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Profile
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink
                    to="/logout"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Logout
                  </NavLink>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
