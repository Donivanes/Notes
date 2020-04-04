import React, { useContext } from "react";
import { useForm, FormContext } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { signup } from "../../lib/authApi";
import { UserContext } from "../components/context/Context";

export const SignUpPage = withRouter(({ history }) => {
  const { user, setUser } = useContext(UserContext);

  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      course: "",
    },
  });

  const { register, handleSubmit, errors } = methods;

  const onSubmit = async (data) => {
    await signup(data);
    setUser(data);
    history.push("/");
  };

  return (
    <FormContext {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>USUARIO</label>
        <input
          type="text"
          placeholder="Usuario"
          name="username"
          ref={register({
            required: {
              value: true,
              message: "Este campo es requerido",
            },
            maxLength: 15,
          })}
        />
        <label>EMAIL</label>
        <input
          type="email"
          placeholder="Email"
          name="email"
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
        <label>CONTRASEÑA</label>
        <input
          type="password"
          placeholder="Contraseña"
          name="password"
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
        <label>CURSO</label>
        <select name="course" ref={register({ required: true })}>
          <option value="Primero">Primero</option>
          <option value="Segundo">Segundo</option>
          <option value="Tercero">Tercero</option>
          <option value="Cuarto">Cuarto</option>
          <option value="Quinto">Quinto</option>
          <option value="Sexto">Sexto</option>
        </select>
        <input type="submit" />
      </form>
      );
    </FormContext>
  );
});