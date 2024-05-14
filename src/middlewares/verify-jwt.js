const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) throw Error("Missing credentials");

    const credentials = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

    req.id = credentials.id;
    next();
  } catch (err) {
    next(err);
  }
};
