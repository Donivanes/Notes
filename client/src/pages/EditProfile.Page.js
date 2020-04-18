import React, { useState } from "react";
import { useForm, FormContext } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { doEdit, useUserSetter, useUser } from "../../lib/auth.api";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
// import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { UnloggedNav } from "../components/UnloggedNav";

export const EditProfilePage = withRouter(({ history }) => {
  const setUser = useUserSetter();
  const user = useUser();

  const methods = user
    ? useForm({
        mode: "onBlur",
        defaultValues: {
          email: user?.username,
          password: "",
          firstname: "",
          lastname: "",
          course: "",
        },
      })
    : useForm({
        mode: "onBlur",
      });

  const { register, handleSubmit, errors } = methods;

  const onSubmit = async (data) => {
    await doEdit(data);
    setUser(data);
    history.push("/");
  };

  return (
    <>
      <style type="text/css">
        {`
    .btn-flat {
      background-color: purple;
      color: white;
    }

    .btn-xxl {
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
    }
    `}
      </style>
      <UnloggedNav />
      <FormContext {...methods}>
        <Container>
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

            {/* <Form.Row>
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
            </Form.Row> */}

            <Button variant="primary" type="submit">
              Guardar cambios
            </Button>
          </Form>
        </Container>
      </FormContext>
    </>
  );
});
