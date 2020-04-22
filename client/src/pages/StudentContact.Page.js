import React, { useState, useEffect } from "react";
import { useForm, FormContext } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { withProtected } from "../../lib/protectRoute.hoc";
import {
  useUser,
  getAllTeachers,
  getStudent,
  sendEmail,
} from "../../lib/auth.api";

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

  const { register, handleSubmit, errors } = methods;

  const onSubmit = async (data) => {
    const dataToSumbit = {
      student,
      data,
      user,
    };
    await sendEmail(dataToSumbit);
    history.push("/student");
  };

  return (
    <FormContext {...methods}>
      <Container>
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

          <Button variant="primary" type="submit">
            Enviar correo!
          </Button>
        </Form>
      </Container>
    </FormContext>
  );
});

export const StudentConctactPage = withProtected(Page);
