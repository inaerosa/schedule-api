const errorFactory = require("./error-factory");

module.exports = {
  BAD_REQUEST: (message) => {
    if (!message) message = message;
    const err = errorFactory.build(message, 400);
    return err;
  },

  UNAUTHORIZED: (message) => {
    if (!message) message = "UNAUTHORIZED";
    const err = errorFactory.build(message, 401);
    return err;
  },

  NOT_FOUND: (message) => {
    if (!message) message = "NOT_FOUND";
    const err = errorFactory.build(message, 404);
    return err;
  },
};
