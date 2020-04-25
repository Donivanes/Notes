import React, { useContext } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import Card from "react-bootstrap/Card";

const Container = styled.div`
  display: flex;
  padding-top: 10em;
  justify-content: center;
  align-content: center;
`;

const Option = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 100%;
  transition-duration: 0.4s;
  border-radius: 4px;
  background-color: #fce38a;
  border: 1px solid #f38181;
  &:hover {
    background-color: #f38181;
  } /* Green */
  color: black;
`;

export const HomePage = () => {
  return (
    <>
      <style type="text/css">
        {`
    .card-margin {
      margin: 3em
    }

    `}
      </style>
      <Container>
        <Card variant="margin" style={({ width: "30rem" }, { margin: "3em" })}>
          <Card.Body>
            <Card.Title>Registrate</Card.Title>
            <Card.Text>
              Comienza a utilizar la App registrandote. ¿Eres alumno o profesor?
            </Card.Text>
            <Option>
              <Link to="/signupStudent">
                <Button>Registro como alumno</Button>
              </Link>

              <Link to="/signupTeacher">
                <Button>Registrate como Profesor</Button>
              </Link>
            </Option>
          </Card.Body>
        </Card>
        <Card style={({ width: "20%" }, { margin: "3em" })}>
          <Card.Body>
            <Card.Title>Inicia sesion</Card.Title>
            <Card.Text>¿Ya tienes cuenta? Logueate!</Card.Text>
            <Link to="/login">
              <Button>Inicia sesion</Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
