import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withAuthentication } from "../lib/withAuthentication";

import { Layout } from "./components/Layout/Layout";
import { HomePage } from "./pages/Home.Page";
import { SignUpStudentPage } from "./pages/SignUpStudent.Page";
import { SignUpTeacherPage } from "./pages/SignUpTeacher.Page";
import { LoginPage } from "./pages/Login.Page";
import { StudentPage } from "./pages/Student.Page";
import { StudentNotesPage } from "./pages/StudentNotes.Page";

export const App = withAuthentication(() => (
  <Router>
    <Layout>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/signupStudent" exact component={SignUpStudentPage} />
        <Route path="/signupTeacher" exact component={SignUpTeacherPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/student" component={StudentPage} />
        <Route path="/califications" component={StudentNotesPage} />
        <Route path="/contact" component={StudentNotesPage} />

        {/* <Route path="/profile" component={ProfilePage} /> */}
      </Switch>
    </Layout>
  </Router>
));
