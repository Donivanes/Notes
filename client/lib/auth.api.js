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

export const doSignup = async ({
  username,
  email,
  password,
  firstname,
  lastname,
  course,
  subject,
}) => {
  // Axios post a ruta /auth/signup en servidor
  // para crear un usuario en mongodb
  console.log(`Registrando usuario...`);
  const res = await api.post("/auth/signup", {
    username,
    email,
    password,
    firstname,
    lastname,
    course,
    subject,
  });
  console.log("Created User");
  return res.data;
};

export const doLogin = async ({ username, password }) => {
  console.log("Do Login");
  const res = await api.post("/auth/login", {
    username,
    password,
  });
  console.log(res.data);
  return res.data;
};

export const doLogout = async () => await api.post("/auth/logout");

export const whoami = async () => {
  const res = await api.get("/user/whoami");
  // console.log(res.data);
  return res.data;
};

export const doEdit = async () => await api.put("/user/edit", { user });

//STUDENT

export const getStudent = async () => {
  const res = await api.get("/student/getstudent");
  return res.data;
};

export const getStudentCourse = async (idCourse) => {
  const res = await api.get(`/course/${idCourse}`);
  // console.log(res);
  return res.data;
};

export const getStudentById = async (idStudent) => {
  const res = await api.get(`/student/${idStudent}`);
  return res.data;
};

//TEACHER

export const getAllTeachers = async () => {
  const res = await api.get("/teacher");
  return res.data;
};

export const getTeacher = async () => {
  const res = await api.get("/teacher/getteacher");
  return res.data;
};

//EMAIL

export const sendEmailStudent = async (dataToSubmit) => {
  const res = await api.post("/email/sendemailstudent", dataToSubmit);
  return res.data;
};

export const sendEmailTeacher = async (dataToSubmit) => {
  const res = await api.post("/email/sendemailteacher", dataToSubmit);
  return res.data;
};

//COURSE

export const getAllCourses = async () => {
  const res = await api.get("/course");
  return res.data;
};

//GET ONE COURSE

export const getCourseId = async (idCourse) => {
  const res = await api.get("/course");
  const all = _.filter(res.data, { _id: idCourse });
  return all;
};

//EXAM

export const getAllExams = async () => {
  const res = await api.get("/exam");
  return res.data;
};

export const addNewExam = async (dataToSubmit) => {
  const res = await api.post("/exam/newexam", dataToSubmit);
  return res.data;
};
