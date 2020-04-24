import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withProtected } from "../../lib/protectRoute.hoc";
import { useUser, getCourseId, getStudentCourse } from "../../lib/auth.api";
import styled from "styled-components";

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

const Page = (props) => {
  const user = useUser();
  const [course, setCourse] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (props.idCourse) {
      getStudentCourse(props.idCourse).then((students) =>
        setStudents(students)
      );
    }
  }, [props]);

  console.log(students);

  if (!user) {
    return <div>cargando</div>;
  } else
    return (
      <Container>
        {students?.map((student, i) => (
          <Link key={i} to={`/studentid/${student.id}`}>
            <Button>{student.firstname}</Button>
          </Link>
        ))}
      </Container>
    );
};

export const TeacherStudentsContactPage = withProtected(Page);
