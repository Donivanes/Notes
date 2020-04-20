import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser, useUserLogout } from "../../../lib/auth.api";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

export const Header = () => {
  const user = useUser();
  // console.log(useUser());
  const handleLogout = useUserLogout();

  console.log(user?.isstudent);
  // const [isStudent, setIsStudent] = useState(user.isstudent);

  // useEffect(() => {
  //   setIsStudent(user.isstudent);
  // });

  // if (!user) {
  //   return <div>cargando</div>;
  // } else {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as="div">
        <Link to="/">Notes App</Link>
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
          {user?.isstudent && (
            <>
              <Nav.Link as="div">
                <Link to="/student">Profile</Link>
              </Nav.Link>
            </>
          )}
        </Nav>
        <Nav>
          {user && (
            <>
              <Nav.Link as="div" className="justify-content-end">
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

{
  /* <Navbar bg="light" expand="lg">
      <Navbar.Brand as="div">
        <Link to="/">Notes App</Link>
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
          {user && (
            <>
              <Nav.Link as="div">
                <Link to="/profile">Profile</Link>
              </Nav.Link>
              <Nav.Link as="div" className="justify-content-end">
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}; */
}
