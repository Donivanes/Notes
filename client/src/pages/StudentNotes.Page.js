import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withProtected } from "../../lib/protectRoute.hoc";
import { getStudent, useUser } from "../../lib/auth.api";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
  const [student, setStudent] = useState([]);
  const user = useUser();

  useEffect(() => {
    getStudent().then((student) => setStudent(student));
  }, []);
  console.log(student);
  if (!user) {
    return <div>cargando</div>;
  } else
    return (
      <Container>
        <ul>
          {/* {park?.map((parks) => (
            <li>{parks.description}</li>
          ))} */}
          <li>Matematicas</li>
          <p>{student.notes?.Matematicas}</p>
          <li>Lengua</li>
          <li>Fisica</li>
          <li>Quimica</li>
          <li>Biologia</li>
          <li>EdFisica</li>
          <li>Ingles</li>
        </ul>
      </Container>
    );
};

export const StudentNotesPage = withProtected(Page);
