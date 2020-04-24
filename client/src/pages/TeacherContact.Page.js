import React, { useState, useEffect } from "react";
import { useForm, FormContext } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { withProtected } from "../../lib/protectRoute.hoc";
import {
  useUser,
  getTeacher,
  sendEmailTeacher,
  getStudentById,
} from "../../lib/auth.api";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Page = withRouter(({ history, idStudent }) => {
  useEffect(() => {
    getStudentById(idStudent).then((student) => setStudent(student[0]));
  }, [idStudent]);

  useEffect(() => {
    getTeacher().then((teacher) => setTeacher(teacher));
  }, []);

  const [teacher, setTeacher] = useState([]);
  const [student, setStudent] = useState([]);

  const user = useUser();
  const [studentEmail, setStudentEmail] = useState("");

  console.log(student);

  const handleChange = (event) => {
    setStudentEmail(event.target.value);
  };

  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      text: "",
      studentEmail: "",
    },
  });

  const { register, handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    const dataToSumbit = {
      teacher,
      data,
      user,
    };
    await sendEmailTeacher(dataToSumbit);
    e.target.reset();
    history.push("/teacher");
  };

  // if (!student) {
  //   return <div>cargando</div>;
  // } else
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
              <Form.Label>Email del Alumno</Form.Label>
              <Form.Control
                as="select"
                value=""
                name="studentEmail"
                type="text"
                placeholder="Email del profesor"
                value={studentEmail}
                onChange={handleChange}
                ref={register({
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                })}
              >
                <option>{`${student.firstname} <${student.email}>`}</option>
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

export const TeacherContactPage = withProtected(Page);
