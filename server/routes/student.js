const express = require("express");
const router = express.Router();

const Student = require("../models/Student");

/* GET ALL STUDENTS */

router.get("/", (req, res, next) => {
  Student.find()
    .populate("course")
    .then((student) => {
      res.json(student);
    })
    .catch((err) => res.status(500).json(err));
});

/* GET STUDENTS BY COURSE */

router.get("/course/:courseId", (req, res, next) => {
  const { courseId } = req.params;
  Student.find({ course: courseId })
    .populate("course")
    .then((course) => {
      res.json(course);
    })
    .catch((err) => res.status(500).json(err));
});

//GET ONE STUDENT

router.get("/getstudent", (req, res, next) => {
  Student.findOne({ username: req.user._id })
    .then((student) => {
      res.json(student);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
