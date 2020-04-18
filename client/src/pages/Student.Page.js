import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withProtected } from "../../lib/protectRoute.hoc";
import { getStudent, useUser } from "../../lib/auth.api";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  background-color: #eaffd0;
  color: black;
  border: 1px solid black;
  border-radius: 2em;
  box-shadow: 5px 5px 10px #000000;
  padding: 2em 0;
  margin: 1em;
  width: 20vw;
  font-size: 1em;
`;

const Page = () => {
  // const [student, setStudent] = useState([]);
  // const [user, setUser] = useState();
  const user = useUser();

  // useEffect(() => {
  //   setUser()
  //   getStudent().then((student) => setStudent(student));
  // }, []);

  if (!user) {
    return <div>cargando</div>;
  } else
    return (
      <Container>
        <Link to="/exams">
          <Button>Proximos examenes</Button>
        </Link>
        <Link to="/califications">
          <Button>Calificaciones examenes</Button>
        </Link>
        <Link to="/contact">
          <Button>Pregunta tus dudas</Button>
        </Link>
      </Container>
    );
};

export const StudentPage = withProtected(Page);
