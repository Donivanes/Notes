const express = require("express");
const router = express.Router();

const Course = require("../models/Course");
const Student = require("../models/Student");

/* GET ALL COURSES */

router.get("/", (req, res, next) => {
  Course.find()
    // .populate("exams")
    .then((course) => {
      res.json([
        course[1],
        course[4],
        course[3],
        course[0],
        course[2],
        course[5],
      ]);
    })
    .catch((err) => res.status(500).json(err));
});

//GET ONE COURSE

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Student.find({ course: id })
    // .populate("course")
    .then((student) => {
      res.json(student);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
