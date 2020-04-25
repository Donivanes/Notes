import React, { useState } from "react";
import { useForm, FormContext } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { doLogin, useUserSetter } from "../../lib/auth.api";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const LoginPage = withRouter(({ history }) => {
  const setUser = useUserSetter();

  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { register, handleSubmit, errors } = methods;

  const onSubmit = async (data) => {
    await doLogin(data);
    setUser(data);
    history.push("/");
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

            <Button variant="width" type="submit">
              Iniciar sesion
            </Button>
          </Form>
        </Container>
      </FormContext>
    </>
  );
});
