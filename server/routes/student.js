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

//GET ONE STUDENT

router.get("/getstudent", (req, res, next) => {
  Student.findOne({ username: req.user._id })
    .populate("course")
    .then((student) => {
      res.json(student);
    })
    .catch((err) => res.status(500).json(err));
});

/* GET ONE STUDENT BY ID */

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Student.find({ _id: id })
    // .populate("course")
    .then((student) => {
      res.json(student);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
