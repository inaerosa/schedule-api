module.exports = {
  build: (message, statusCode) => {
    const error = new Error();
    error.message = message ?? 500;
    error.status = statusCode ?? 500;

    return error;
  },
};
