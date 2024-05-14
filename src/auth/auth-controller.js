const exception = require("../errors/exception");
const professionalsRepository = require("../professionals/professionals-repository");
const authGenerateTokenService = require("./auth-generate-token-service");
const bcrypt = require("bcryptjs");

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const professional = await professionalsRepository.getByEmail({
      email,
    });

    if (!professional) throw exception.BAD_REQUEST("Professional not found");

    const isPasswordValid = bcrypt.compare(password, professional?.password);

    if (!isPasswordValid || !professional)
      throw exception.UNAUTHORIZED("Wrong credentials");

    const accessToken = authGenerateTokenService({ id: professional.id });

    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};
