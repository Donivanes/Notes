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

router.use("/auth", auth);

router.use(isLoggedIn());

router.use("/user", user);
router.use("/student", student);

module.exports = router;
