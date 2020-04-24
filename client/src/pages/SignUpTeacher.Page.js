import React, { useState } from "react";
import { useForm, FormContext } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { doSignup, useUserSetter } from "../../lib/auth.api";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const SignUpTeacherPage = withRouter(({ history }) => {
  const setUser = useUserSetter();

  const [subject, setSubject] = useState("");

  const handleChange = (event) => {
    setSubject(event.target.value);
  };

  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      subject: "",
    },
  });

  const { register, handleSubmit, errors } = methods;

  const onSubmit = async (data) => {
    await doSignup(data);
    setUser(data);
    history.push("/teacher");
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
    `}
      </style>

      <FormContext {...methods}>
        <Container style={{ padding: "4em" }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="user">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                name="username"
                placeholder="Nombre de usuario"
                ref={register({
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                })}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Email"
                ref={register({
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i,
                    message: "Formato email no valido",
                  },
                })}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Contraseña"
                ref={register({
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/,
                    message:
                      "La contraseña requiere al meno una mayuscula, minuscula y numero",
                  },
                })}
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="firstname">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  name="firstname"
                  type="text"
                  placeholder="Nombre"
                  ref={register({
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                  })}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="lastname">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  name="lastname"
                  type="text"
                  placeholder="Apellidos"
                  ref={register({
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                  })}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="subject">
                <Form.Label>Asignatura</Form.Label>
                <Form.Control
                  as="select"
                  value=""
                  name="subject"
                  type="text"
                  placeholder="Asignatura"
                  value={subject}
                  onChange={handleChange}
                  ref={register({
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                  })}
                >
                  <option>Matematicas</option>
                  <option>Lengua</option>
                  <option>Fisica</option>
                  <option>Quimica</option>
                  <option>Biologia</option>
                  <option>EdFisica</option>
                  <option>Ingles</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Button variant="width" type="submit">
              Registrate
            </Button>
          </Form>
        </Container>
      </FormContext>
    </>
  );
});
