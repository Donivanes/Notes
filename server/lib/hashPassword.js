const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const hashPassword = text => bcrypt.hashSync(text, salt);

const checkHashedPassword = bcrypt.compareSync;

module.exports = {
  hashPassword,
  checkHashedPassword
};
