import axios from "axios";
import React, { useContext } from "react";
import _ from "lodash";

export const UserContext = React.createContext();

export const useUser = () => {
  const userState = useContext(UserContext);
  return userState.user;
};

export const useUserSetter = () => {
  const userState = useContext(UserContext);
  return userState.setUser;
};

export const useUserIsLoading = () => {
  const userState = useContext(UserContext);
  return userState.loading;
};

export const useUserLogout = () => {
  const userState = useContext(UserContext);

  // NOTE: This returned function is "handleLogout"
  return async () => {
    console.log("log out!");
    // Remove user from React User State context
    userState.setUser(null);
    // Remove cookie from backend and frontend
    return doLogout();
  };
};

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const doSignup = async (user) => {
  // Axios post a ruta /auth/signup en servidor
  // para crear un usuario en mongodb
  console.log(`Registrando usuario...`);
  const { data } = await api.post("/auth/signup", {
    user,
  });
  console.log("Created User");
  return _.pick(data, "username", "email");
};

export const doLogin = async (username, password) => {
  console.log("Do Login");
  const { data } = await api.post("/auth/login", {
    username,
    password,
  });
  console.log(res.data);
  return _.pick(data, "username", "email");
};

export const doLogout = async () => await api.get("/auth/logout");

export const whoami = async () => {
  const { data } = await api.get("/user/whoami");
  return _.pick(data, "username", "email");
};

// export const edit = async () => await api.post("/user/edit", { user });

// export const upload = async image => await api.post("/user/upload", { image });
