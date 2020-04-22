const express = require("express");
const router = express.Router();
const { sendEmail } = require("../email");

router.post("/sendemailstudent", (req, res) => {
  const { data, student, user } = req.body;
  console.log(req.body);
  sendEmail(
    data.teacherEmail,
    student.firstname,
    student.lastname,
    student.course.name,
    data.text,
    user.isstudent
  );
});

router.post("/sendemailteacher", (req, res) => {
  const { data, teacher, user } = req.body;
  console.log(req.body);
  sendEmail(
    data.studentEmail,
    teacher.firstname,
    teacher.lastname,
    teacher.subject,
    data.text,
    user.isstudent
  );
});

module.exports = router;

// to, firstname, lastname, course, text
