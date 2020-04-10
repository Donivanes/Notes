const express = require("express");
const router = express.Router();
const { hashPassword } = require("../lib/hashPassword");
const User = require("../models/User");

/* GET USER*/

// LOGGEDIN
router.get("/loggedin", async (req, res) => {
  if (req.user) return res.json(req.user);
  else return res.status(401).json({ status: "No user session present" });
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
      firstname,
      lastname,
    });
    return res.json({ status: "Edit Profile" });
  } catch (error) {
    return res.status(401).json({ status: "Not Found" });
  }
});

module.exports = router;
