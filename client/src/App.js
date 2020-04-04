import React from "react";
import "./App.css";
import { HomePage } from "./pages/Home.Page";
import { SignUpStudentPage } from "./pages/SignUpStudent.Page";
import { SignUpTeacherPage } from "./pages/SignUpStudent.Page";

export const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/signupStudent" component={SignUpStudentPage} />
      <Route path="/signupTeacher" component={SignUpTeacherPage} />
      {/* <Route path="/login" component={LoginPage} />
      <Route path="/profile" component={ProfilePage} /> */}
    </Switch>
  </Router>
);
