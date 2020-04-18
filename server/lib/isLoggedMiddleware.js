const isLoggedIn = (redirectRoute = "/login") => (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    return res
      .status(401)
      .json({ status: "User must be logged" })
      .redirect(redirectRoute);
  }
};

const isLoggedOut = (redirectRoute = "/") => (req, res, next) => {
  if (!req.user) {
    return next();
  } else {
    return res
      .status(401)
      .json({ status: "User already logged" })
      .redirect(redirectRoute);
  }
};

module.exports = {
  isLoggedIn,
  isLoggedOut
};
