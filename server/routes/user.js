const express = require("express");
const router = express.Router();
const { hashPassword } = require("../lib/hashPassword");
const User = require("../models/User");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

/* GET USER*/

// WHOAMI
router.get("/whoami", async (req, res) => {
  if (req.user.isstudent === "true") {
    const student = Student.findOne({
      username: req.user._id,
    }).then((student) => console.log(student));
    return res.json(req.user);
  } else if (req.user.isstudent === "false") {
    const teacher = Teacher.findOne({
      username: req.user._id,
    }).then((teacher) => console.log(teacher));
    return res.json(req.user);
  }
  return res.status(401).json({ status: "No user session present" });
});

/* GET ONE */
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  User.findOne({ _id: id })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.status(500).json(err));
});

/* EDIT */

router.put("/:id", async (req, res, next) => {
  try {
    const id = req.user._id;
    const { username, email, password, firstname, lastname } = req.body;
    await User.findByIdAndUpdate(id, {
      username,
      email,
      password: hashPassword(password),
    });
    return res.json({ status: "Edit Profile" });
  } catch (error) {
    return res.status(401).json({ status: "Not Found" });
  }
});

module.exports = router;

// if (req.user.isstudent === true) {
//   console.log(req.body);
//   await Student.findOneAndUpdate(
//     { username: id },
//     { $set: { firstname, lastname } },
//     { new: true }
//   );
// } else {
//   await Teacher.findOneAndUpdate(
//     { username: id },
//     {
//       firstname,
//       lastname,
//     },
//     { new: true }
//   );
// }
