const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  checkAvailability: celebrate({
    [Segments.BODY]: {
      dateStart: Joi.object({
        year: Joi.number().required(),
        month: Joi.number().min(1).max(12).required(),
        day: Joi.number().min(1).max(31).required(),
        hour: Joi.number().min(0).max(23).required(),
        minutes: Joi.number().min(0).max(59).required(),
      }),
      dateEnd: Joi.object({
        year: Joi.number().required(),
        month: Joi.number().min(1).max(12).required(),
        day: Joi.number().min(1).max(31).required(),
        hour: Joi.number().min(0).max(23).required(),
        minutes: Joi.number().min(0).max(59).required(),
      }),
    },
  }),

  checkId: celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid({ version: "uuidv4" }).required(),
    },
  }),
};
