import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withAuthentication } from "../lib/withAuthentication";

import { Layout } from "./components/Layout/Layout";
import { HomePage } from "./pages/Home.Page";
import { SignUpStudentPage } from "./pages/SignUpStudent.Page";
import { SignUpTeacherPage } from "./pages/SignUpTeacher.Page";
import { LoginPage } from "./pages/Login.Page";
import { StudentPage } from "./pages/Student.Page";
import { StudentExamsPage } from "./pages/StudentExams.Page";
import { StudentNotesPage } from "./pages/StudentNotes.Page";
import { StudentConctactPage } from "./pages/StudentContact.Page";
import { TeacherPage } from "./pages/Teacher.Page";
import { TeacherCoursesExamPage } from "./pages/TeacherCoursesExam.Page";
import { TeacherCoursesCalPage } from "./pages/TeacherCoursesCalification.Page";
import { TeacherCoursesContactPage } from "./pages/TeacherCoursesContact.Page";
import { TeacherStudentsContactPage } from "./pages/TeacherStudentsContact.Page";
import { TeacherContactPage } from "./pages/TeacherContact.Page";
import { TeacherPutExamsPage } from "./pages/TeacherPutExams.Page";
import { TeacherStudentsCalificatePage } from "./pages/TeacherStudentsCalificate.Page";
import { TeacherCalificate } from "./pages/TeacherCalificate.Page";

export const App = withAuthentication(() => (
  <Router>
    <Layout>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/signupStudent" exact component={SignUpStudentPage} />
        <Route path="/signupTeacher" exact component={SignUpTeacherPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/student" component={StudentPage} />
        <Route path="/exams" component={StudentExamsPage} />
        <Route path="/califications" component={StudentNotesPage} />
        <Route path="/contact" component={StudentConctactPage} />
        <Route path="/teacher" component={TeacherPage} />
        {/* PONER EXAMEN */}
        <Route path="/putexams" component={TeacherCoursesExamPage} />
        <Route
          path="/putexam/:idCourse"
          component={(props) => {
            return (
              <TeacherPutExamsPage idCourse={props.match.params.idCourse} />
            );
          }}
        />
        {/* EVALUAR */}
        <Route path="/putcalifications" component={TeacherCoursesCalPage} />
        <Route
          path="/putcalification/:idCourse"
          component={(props) => {
            return (
              <TeacherStudentsCalificatePage
                idCourse={props.match.params.idCourse}
              />
            );
          }}
        />
        <Route
          path="/calificatestudent/:idStudent"
          component={(props) => {
            return (
              <TeacherCalificate idStudent={props.match.params.idStudent} />
            );
          }}
        />
        {/* EMAIL A ESTUDIANTES */}
        <Route path="/contactstudents" component={TeacherCoursesContactPage} />
        <Route
          path="/contactstudent/:idCourse"
          component={(props) => {
            return (
              <TeacherStudentsContactPage
                idCourse={props.match.params.idCourse}
              />
            );
          }}
        />
        <Route
          path="/studentid/:idStudent"
          component={(props) => {
            return (
              <TeacherContactPage idStudent={props.match.params.idStudent} />
            );
          }}
        />
      </Switch>
    </Layout>
  </Router>
));
