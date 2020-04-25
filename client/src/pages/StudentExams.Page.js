import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withProtected } from "../../lib/protectRoute.hoc";
import { useUser, getStudent, getAllExams } from "../../lib/auth.api";
import styled from "styled-components";

import Card from "react-bootstrap/Card";

const Container = styled.div`
  display: flex;
  margin-top: 3em;
`;

const Page = () => {
  const user = useUser();
  const [student, setStudent] = useState([]);

  useEffect(() => {
    getStudent().then((student) => setStudent(student));
  }, []);

  console.log(student);

  const margin = {
    marginLeft: "10px",
    width: "18rem",
    backgroundColor: "#fce38a",
    borderColor: "#f38181",
  };

  if (!user) {
    return <div>cargando</div>;
  } else
    return (
      <>
        <style type="text/css">
          {`
    .card-edit {
      background-color: #fce38a;
    }
    `}
        </style>
        <Container>
          {student.course?.exams.map((exam, i) => (
            <Card style={margin} key={i}>
              <Card.Header>
                Examen de <b>{exam.subject}</b>
              </Card.Header>
              <Card.Body variant="edit">
                <Card.Title>Fecha: {exam.date}</Card.Title>
                <Card.Text>
                  Hora del examen <b>{exam.time}</b> PM.
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Container>
      </>
    );
};

export const StudentExamsPage = withProtected(Page);
