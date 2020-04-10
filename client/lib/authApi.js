import axios from "axios";
import _ from "lodash";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const signup = async (user) => {
  const { data } = await api.post("/auth/signup", { user });
  return _.pick(data, "username", "email");
};

export const login = async (username, password) => {
  const { data } = await api.post("/auth/login", {
    username,
    password,
  });
  return _.pick(data, "username", "email");
};

export const logout = async () => await api.get("/auth/logout");

export const loggedin = async () => {
  const { data } = await api.get("/user/loggedin");
  return _.pick(data, "username", "email");
};

// export const edit = async () => await api.post("/user/edit", { user });

// export const upload = async image => await api.post("/user/upload", { image });
