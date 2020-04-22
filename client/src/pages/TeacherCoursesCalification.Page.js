import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withProtected } from "../../lib/protectRoute.hoc";
import { useUser, getAllCourses } from "../../lib/auth.api";
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
  const user = useUser();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllCourses().then((courses) => setCourses(courses));
  }, []);

  if (!user) {
    return <div>cargando</div>;
  } else
    return (
      <Container>
        {courses.map((course, i) => (
          <Link key={i} to={`/putcalifications/${course._id}`}>
            <Button>{course.name}</Button>
          </Link>
        ))}
      </Container>
    );
};

export const TeacherCoursesCalPage = withProtected(Page);
