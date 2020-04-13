const express = require("express");
const User = require("../models/Comment");
const Teacher = require("../models/Movie");

const router = express.Router();

router.post("/:movieId", (req, res, next) => {
  const newComment = new Comment(req.body);
  newComment
    .save()
    .then((comment) => {
      Movie.findOneAndUpdate(
        { _id: req.params.movieId },
        { $push: { comments: comment._id } },
        { new: true }
      ).then((movie) => {
        res.json(movie);
      });
    })
    .catch((err) => res.status(500).json(err));
});
