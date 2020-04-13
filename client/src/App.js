import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withAuthentication } from "../lib/withAuthentication";

import { HomePage } from "./pages/Home.Page";
import { SignUpStudentPage } from "./pages/SignUpStudent.Page";
import { SignUpTeacherPage } from "./pages/SignUpTeacher.Page";

export const App = withAuthentication(() => (
  <Router>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/signupStudent" exact component={SignUpStudentPage} />
      <Route path="/signupTeacher" exact component={SignUpTeacherPage} />
      {/* <Route path="/login" component={LoginPage} />
      <Route path="/profile" component={ProfilePage} /> */}
    </Switch>
  </Router>
));
