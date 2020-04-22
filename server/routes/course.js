const express = require("express");
const router = express.Router();

const Course = require("../models/Course");

/* GET ALL COURSES */

router.get("/", (req, res, next) => {
  Course.find()
    // .populate("exams")
    .then((course) => {
      res.json(course);
    })
    .catch((err) => res.status(500).json(err));
});

//GET ONE COURSE
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Course.findOne({ _id: id })
    .then((course) => {
      res.json(course);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
