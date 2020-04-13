const express = require("express");
const router = express.Router();

const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

/* GET ALL TEACHERS */

router.get("/", (req, res, next) => {
  Teacher.find()
    .then((teacher) => {
      res.json(teacher);
    })
    .catch((err) => res.status(500).json(err));
});

//GET ONE TEACHER

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Teacher.findOne({ _id: id })
    .then((teacher) => {
      res.json(teacher);
    })
    .catch((err) => res.status(500).json(err));
});

//POST NOTES

// router.post("/notes/:userId", (req, res, next) => {
//   const studentId = req.params.id;
//   newComment
//     .save()
//     .then((comment) => {
//       User.findOneAndUpdate(
//         { _id: req.params.userId },
//         { $push: { notes: comment._id } },
//         { new: true }
//       ).then((movie) => {
//         res.json(movie);
//       });
//     })
//     .catch((err) => res.status(500).json(err));
// });

module.exports = router;
