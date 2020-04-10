const express = require("express");
const router = express.Router();

const Teacher = require("../models/Teacher");

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

module.exports = router;
