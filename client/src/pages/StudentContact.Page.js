import React, { useState, useEffect } from "react";
import { withProtected } from "../../lib/protectRoute.hoc";
import { useUser, getAllTeachers } from "../../lib/auth.api";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
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
  const [email, setEmail] = useState("");
  const [teacher, setTeacher] = useState([]);
  const user = useUser();

  useEffect(() => {
    getAllTeachers().then((teachers) => setTeacher(teachers));
  }, []);
  console.log(teachers);

  if (!user) {
    return <div>cargando</div>;
  } else
    return (
      <Container>
        <form onSubmit={handleSubmit}>
          <input
            id="name"
            placeholdder="name"
            value={name}
            onClick={handleClick}
          />
          <input
            id="name"
            placeholdder="name"
            value={name}
            onClick={handleClick}
          />
          <button onClick={handleSubmit}>Enviar email</button>
        </form>
      </Container>
    );
};

export const StudentConctactPage = withProtected(Page);