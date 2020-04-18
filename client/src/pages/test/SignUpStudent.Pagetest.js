import React, { useContext, useState } from "react";
import { useForm, FormContext } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { doSignup } from "../../../lib/auth.api";

// import { UserContext } from "../components/context/Context";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export const SignUpStudentPage = withRouter(({ history }) => {
  const classes = useStyles();

  const courses = [
    "Primero",
    "Segundo",
    "Tercero",
    "Cuarto",
    "Quinto",
    "Sexto",
  ];

  const [course, setCourse] = useState("");

  const handleChange = (event) => {
    setCourse(event.target.value);
  };

  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      course: "",
    },
  });

  const { register, handleSubmit, errors } = methods;

  const onSubmit = async (data) => {
    await doSignup(data);
    setUser(data);
    history.push("/profile");
  };

  return (
    <FormContext {...methods}>
      <Container maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* <label>USUARIO</label>
        <input
          type="text"
          placeholder="Nombre de usuario"
          name="username"
          ref={register({
            required: {
              value: true,
              message: "Este campo es requerido",
            },
          })}
        /> */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Usuario"
                  name="username"
                  autoComplete="username"
                  inputRef={register({
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstname"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstname"
                  label="Nombre"
                  autoFocus
                  inputRef={register({
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastname"
                  label="Apellido"
                  name="lastname"
                  autoComplete="lname"
                  inputRef={register({
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                  })}
                />
              </Grid>

              {/* <label>EMAIL</label>
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
          })} */}

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputRef={register({
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
              </Grid>

              {/* <label>CONTRASEÑA</label>
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
          })} */}

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  inputRef={register({
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
              </Grid>

              <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel required>Campus</InputLabel>
                  <Select
                    label="campus"
                    name="campus"
                    value={course}
                    onChange={handleChange}
                    inputRef={register({
                      required: {
                        value: true,
                        message: "Este campo es requerido",
                      },
                    })}
                  >
                    {courses.map((e, i) => (
                      <MenuItem key={i} value={e}>
                        {e}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {/* <label>NOMBRE</label>
        <input
          type="text"
          placeholder="Nombre"
          name="firstname"
          ref={register({
            required: {
              value: true,
              message: "Este campo es requerido",
            },
          })}
        />
        <label>APELLIDOS</label>
        <input
          type="text"
          placeholder="Apellidos"
          name="lastname"
          ref={register({
            required: {
              value: true,
              message: "Este campo es requerido",
            },
          })}
        /> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  ¿Ya tienes cuenta?, ¡Inicia sesión!
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        {/* <label>CURSO</label>
        <select name="course" ref={register({ required: true })}>
          <option value="Primero">Primero</option>
          <option value="Segundo">Segundo</option>
          <option value="Tercero">Tercero</option>
          <option value="Cuarto">Cuarto</option>
          <option value="Quinto">Quinto</option>
          <option value="Sexto">Sexto</option>
        </select>
        <button type="submit" />
      </form> */}
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </FormContext>
  );
});
