import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser, useUserLogout } from "../../../lib/auth.api";
import logo from "../../../public/icon/notesapp.png";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

export const Header = () => {
  const user = useUser();

  const handleLogout = useUserLogout();

  return (
    <>
      <style type="text/css">
        {`
    .navbar-custom {
      background-color: #95e1d3;
      color: #f38181;
    }

    `}
      </style>
      <Navbar variant="custom" expand="lg">
        <Navbar.Brand as="div">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          <Link to="/"> Notes App</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {!user && (
              <>
                <Nav.Link as="div">
                  <Link to="/login">Inicia Sesion</Link>
                </Nav.Link>
                <NavDropdown title="Registrate" id="basic-nav-dropdown">
                  <NavDropdown.Item as="div">
                    <Link to="/signupStudent">Registrate como Alumno</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item as="div">
                    <Link to="/signupTeacher">Registrate como Profesor</Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
          <Nav>
            {user && (
              <>
                {user?.isstudent === "true" && (
                  <>
                    <Nav.Link as="div" className="justify-content-start">
                      <Link to="/student">Perfil</Link>
                    </Nav.Link>
                  </>
                )}
                {user?.isstudent === "false" && (
                  <>
                    <Nav.Link as="div">
                      <Link to="/teacher">Perfil</Link>
                    </Nav.Link>
                  </>
                )}
                <Nav.Link as="div" className="justify-content-end">
                  <Link to="/" onClick={handleLogout}>
                    Cierra sesion
                  </Link>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
// };
