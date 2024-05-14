const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  saveAppointment: celebrate({
    [Segments.BODY]: {
      professionalId: Joi.string().uuid({ version: "uuidv4" }).required(),
      appointmentDate: Joi.string().isoDate().required(),
      customerName: Joi.string().required(),
      customerEmail: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
    },
  }),

  deleteAppointment: celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid({ version: "uuidv4" }).required(),
    },
  }),
};
