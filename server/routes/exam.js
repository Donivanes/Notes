const express = require("express");
const router = express.Router();

const Exam = require("../models/Exam");
const Course = require("../models/Course");

//GET EXAMS OF A COURSE

router.get("/", (req, res, next) => {
  Exam.find()
    .then((exam) => {
      res.json(exam);
    })
    .catch((err) => res.status(500).json(err));
});

//ADD EXAM

router.post("/newexam", (req, res, next) => {
  const { teacher, data, course } = req.body;
  const newExam = new Exam({
    course: course.name,
    subject: teacher.subject,
    date: data.date,
    time: data.time,
  });
  newExam
    .save()
    .then((exam) => {
      Course.findOneAndUpdate(
        { _id: course._id },
        { $push: { exams: exam._id } },
        { new: true }
      ).then((examadded) => {
        console.log("SE AÑADIO!");
        res.json(examadded);
      });
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
