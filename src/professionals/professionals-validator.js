const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  saveProfessional: celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string(),
    },
  }),

  listProfessionals: celebrate({
    [Segments.QUERY]: {
      dtStart: Joi.string().isoDate(),
      dtEnd: Joi.string().isoDate(),
    },
  }),
};
