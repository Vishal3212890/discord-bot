const Joi = require("joi");

module.exports = (body) => {
  return Joi.object({
    name: Joi.string().required(),
    reward: Joi.number()
      .integer()
      .min(0)
      .max(Number.MAX_SAFE_INTEGER)
      .required(),
    description: Joi.string(),
    numberOfMessages: Joi.number(),
    numberOfInvites: Joi.number(),
  }).validate(body);
};
