const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Subject = require("../models/Subject");
const Course = require("../models/Course");

const _ = require("lodash");

const passport = require("passport");

const { isLoggedIn, isLoggedOut } = require("../lib/isLoggedMiddleware");

// SIGNUP
router.post("/signup", isLoggedOut(), async (req, res, next) => {
  const { username, password, email, course, subject } = req.body;

  // Create the user
  const existingUser = await User.findOne({ username });

  if (!existingUser) {
    const newUser = await User.create({
      username,
      password,
      email,
    });
    if (course && !subject) {
      const findIdCourse = await Course.findOne({ name: course });
      const newStudent = await Student.create({
        username: newUser._id,
        course: findIdCourse._id,
      });
      const newStudentSubject = await Subject.create({
        username: newUser._id,
      });
    } else if (!course && subject) {
      const newTeacher = await Teacher.create({
        username: newUser._id,
        subject,
      });
    } else {
      res.status(401).json({ status: "Fill every field" });
    }

    // Directly login user
    req.logIn(newUser, (err) => {
      res.status(201).json(_.pick(req.user, ["username", "email"]));
    });
  } else {
    res.status(401).json({ status: "User Exist" });
  }
});

// LOGIN
router.post(
  "/login",
  isLoggedOut(),
  passport.authenticate("local"),
  (req, res) => {
    return res
      .status(200)
      .json(_.pick(req.user, ["username", "_id", "createdAt", "updatedAt"]));
  }
);

// LOGOUT
router.post("/logout", isLoggedIn(), async (req, res, next) => {
  if (req.user) {
    req.logout();
    return res.status(200).json({ status: "Log out" });
  } else {
    return res
      .status(500)
      .json({ status: "You have to be logged in to logout" });
  }
});

// LOGGEDIN
router.get("/loggedin", isLoggedIn(), async (req, res) => {
  if (req.user) return res.json(req.user);
  else return res.status(401).json({ status: "No user session present" });
});

module.exports = router;
