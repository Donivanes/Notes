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
    .then((course) => {
      res.json(course);
    })
    .catch((err) => res.status(500).json(err));
});

//GET ONE STUDENT

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Student.findOne({ _id: id })
    .then((student) => {
      res.json(student);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
