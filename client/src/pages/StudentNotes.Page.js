import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withProtected } from "../../lib/protectRoute.hoc";
import { getStudent, useUser } from "../../lib/auth.api";
import styled from "styled-components";
import Table from "react-bootstrap/Table";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4em;
`;

const Button = styled.button`
  background-color: #fce38a;
  color: black;
  border: 1px solid black;
  border-radius: 2em;
  box-shadow: 5px 5px 10px #000000;
  padding: 2em 0;
  margin: 1.5em;
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
      <>
        <style type="text/css">
          {`
    .table-color {
      background-color: #fce38a;
    }
    `}
        </style>
        <Container>
          <Table striped bordered hover variant="color">
            <thead>
              <tr>
                <th>#</th>
                <th>Examen 1</th>
                <th>Examen 2</th>
                <th>Examen 3</th>
                <th>Media</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Matematicas</td>
                <td>{student.notes?.Matematicas[0]}</td>
                <td>{student.notes?.Matematicas[1]}</td>
                <td>{student.notes?.Matematicas[2]}</td>
                <td>{student.notes?.Matematicas[2]}</td>
              </tr>
              <tr>
                <td>Lengua</td>
                <td>{student.notes?.Lengua[0]}</td>
                <td>{student.notes?.Lengua[1]}</td>
                <td>{student.notes?.Lengua[2]}</td>
                <td>{student.notes?.Lengua[2]}</td>
              </tr>
              <tr>
                <td>Fisica</td>
                <td>{student.notes?.Fisica[0]}</td>
                <td>{student.notes?.Fisica[1]}</td>
                <td>{student.notes?.Fisica[2]}</td>
                <td>{student.notes?.Fisica[2]}</td>
              </tr>
              <tr>
                <td>Quimica</td>
                <td>{student.notes?.Quimica[0]}</td>
                <td>{student.notes?.Quimica[1]}</td>
                <td>{student.notes?.Quimica[2]}</td>
                <td>{student.notes?.Quimica[2]}</td>
              </tr>
              <tr>
                <td>Biologia</td>
                <td>{student.notes?.Biologia[0]}</td>
                <td>{student.notes?.Biologia[1]}</td>
                <td>{student.notes?.Biologia[2]}</td>
                <td>{student.notes?.Biologia[2]}</td>
              </tr>
              <tr>
                <td>EdFisica</td>
                <td>{student.notes?.EdFisica[0]}</td>
                <td>{student.notes?.EdFisica[1]}</td>
                <td>{student.notes?.EdFisica[2]}</td>
                <td>{student.notes?.EdFisica[2]}</td>
              </tr>
              <tr>
                <td>Ingles</td>
                <td>{student.notes?.Ingles[0]}</td>
                <td>{student.notes?.Ingles[1]}</td>
                <td>{student.notes?.Ingles[2]}</td>
                <td>{student.notes?.Ingles[2]}</td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </>
    );
};

export const StudentNotesPage = withProtected(Page);
