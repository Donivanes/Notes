import React, { useState, useEffect } from "react";
import { useForm, FormContext } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { withProtected } from "../../lib/protectRoute.hoc";
import {
  useUser,
  getAllTeachers,
  getStudent,
  sendEmailStudent,
} from "../../lib/auth.api";

import styled from "styled-components";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Page = withRouter(({ history }) => {
  const [teacher, setTeacher] = useState([]);
  const [student, setStudent] = useState([]);

  const user = useUser();
  const [teacherEmail, setTeacherEmail] = useState("");

  useEffect(() => {
    getAllTeachers().then((teachers) => setTeacher(teachers));
  }, []);

  useEffect(() => {
    getStudent().then((student) => setStudent(student));
  }, []);

  const handleChange = (event) => {
    setTeacherEmail(event.target.value);
  };

  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      text: "",
      teacherEmail: "",
    },
  });

  const { register, handleSubmit, reset } = methods;

  const onSubmit = async (data, e) => {
    const dataToSumbit = {
      student,
      data,
      user,
    };
    await sendEmailStudent(dataToSumbit);
    e.target.reset();
    history.push("/student");
  };

  return (
    <>
      <style type="text/css">
        {`
    .btn-width {
      width: 100%;
      background-color: #fce38a;
      border: 1px solid #f38181;
    }
    `}
      </style>
      <FormContext {...methods}>
        <Container style={{ padding: "4em" }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="teacher">
              <Form.Label>Email del Profesor</Form.Label>
              <Form.Control
                as="select"
                value=""
                name="teacherEmail"
                type="text"
                placeholder="Email del profesor"
                value={teacherEmail}
                onChange={handleChange}
                ref={register({
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                })}
              >
                {teacher.map((teacher, i) => (
                  <option key={i}>
                    {`${teacher.subject} <${teacher.email}>`}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="text">
              <Form.Label>Cuerpo del email</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="text"
                placeholder="Escribe tu correo aqui"
                ref={register({
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                })}
              />
            </Form.Group>

            <Button variant="width" type="submit">
              Enviar correo!
            </Button>
          </Form>
        </Container>
      </FormContext>
    </>
  );
});

export const StudentConctactPage = withProtected(Page);
