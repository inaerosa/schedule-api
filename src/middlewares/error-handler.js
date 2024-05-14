const { PrismaClientKnownRequestError } = require("@prisma/client");

module.exports = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof PrismaClientKnownRequestError) {
    // The .code property can be accessed in a type-safe manner
    if (err.code === "P2002") {
      err.message = `${err.meta.target[0]} already exists in our database`;
      err.status = 400;
    }
  }
  res.status(err?.status || 500).json({ message: err.message });
};
