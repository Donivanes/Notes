import React, { useState, useEffect } from "react";
import { useForm, FormContext } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { withProtected } from "../../lib/protectRoute.hoc";
import {
  useUser,
  getTeacher,
  getCourseId,
  addNewExam,
} from "../../lib/auth.api";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

const Page = withRouter(({ history, idCourse }) => {
  const user = useUser();
  const [course, setCourse] = useState([]);
  const [teacher, setTeacher] = useState([]);

  useEffect(() => {
    getCourseId(idCourse).then((course) => setCourse(course[0]));
  }, [idCourse]);

  console.log(course);

  useEffect(() => {
    getTeacher().then((teacher) => setTeacher(teacher));
  }, []);

  const [time, setTime] = useState("");

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      date: "",
      time: "",
    },
  });

  const { register, handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    const dataToSumbit = {
      teacher,
      data,
      course,
    };
    await addNewExam(dataToSumbit);
    history.push("/teacher");
  };

  // if (!student) {
  //   return <div>cargando</div>;
  // } else

  const style = {
    margin: "3em",
    padding: "1em",
    border: "1px solid #f38181",
  };
  return (
    <>
      <style type="text/css">
        {`
    .btn-width {
      width: 100%;
      background-color: #fce38a;
      border: 1px solid #f38181;
      transition-duration: 0.4s;
    }
    .btn-width:hover{
      background-color: #f38181;
    }
    .badge-edit{
      background-color: #f38181
    }
    .container-margin{
      margin: 4em;
      padding: 1em;
      border: 1px solid #f38181;
    }
    `}
      </style>

      <FormContext {...methods}>
        <Container style={style}>
          <h2>
            Curso <Badge variant="edit">{course.name}</Badge>
          </h2>
          <h3>
            Asignatura <Badge variant="edit">{teacher.subject}</Badge>
          </h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Row>
              <Form.Group as={Col} controlId="date">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  name="date"
                  type="date"
                  placeholder="Fecha"
                  ref={register({
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                  })}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="time">
                <Form.Label>Hora</Form.Label>
                <Form.Control
                  as="select"
                  value=""
                  name="time"
                  type="text"
                  placeholder="Hora"
                  value={time}
                  onChange={handleChange}
                  ref={register({
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                  })}
                >
                  <option>09:00</option>
                  <option>10:00</option>
                  <option>11:00</option>
                  <option>12:00</option>
                  <option>13:00</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Button variant="width" type="submit">
              Añadir Examen
            </Button>
          </Form>
        </Container>
      </FormContext>
    </>
  );
});

export const TeacherPutExamsPage = withProtected(Page);
