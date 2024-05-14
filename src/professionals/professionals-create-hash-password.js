const bcrypt = require("bcryptjs");

module.exports = async (password) => {
  return bcrypt.hashSync(password, 10);
};
