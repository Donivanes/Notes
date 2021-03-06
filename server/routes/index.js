const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../lib/isLoggedMiddleware");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json({ status: "Welcome" });
});

const auth = require("./auth");
const user = require("./user");
const student = require("./student");
const teacher = require("./teacher");
const email = require("./email");
const course = require("./course");
const exam = require("./exam");

router.use("/auth", auth);

router.use(isLoggedIn());

router.use("/user", user);
router.use("/student", student);
router.use("/teacher", teacher);
router.use("/email", email);
router.use("/course", course);
router.use("/exam", exam);

module.exports = router;
