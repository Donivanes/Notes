import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../components/context/Context";

export const HomePage = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      {user ? <h1>{user.username}</h1> : <h1>Notes App</h1>}
      <div>
        <Link className="button" to="/signupStudent">
          Regístrate como alumno
        </Link>
        <Link className="button" to="/signupTeacher">
          Regístrate como teacher
        </Link>
        <Link className="button" to="/login">
          Iniciar Sesión
        </Link>
      </div>
    </>
  );
};
