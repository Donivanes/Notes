const express = require("express");
const router = express.Router();
const { sendEmail } = require("../email");

router.post("/sendEmail", (req, res) => {
  const { data, student } = req.body;
  sendEmail(
    data.teacherEmail,
    student.firstname,
    student.lastname,
    student.course.name,
    data.text
  );
});

module.exports = router;

// to, firstname, lastname, course, text
