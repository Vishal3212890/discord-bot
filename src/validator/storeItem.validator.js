const Joi = require("joi");

module.exports = (body) => {
  return Joi.object({
    name: Joi.string().required(),
    price: Joi.number()
      .integer()
      .min(0)
      .max(Number.MAX_SAFE_INTEGER)
      .required(),
    description: Joi.string(),
    roleId: Joi.string().required(),
    stock: Joi.number().integer().min(0).max(Number.MAX_SAFE_INTEGER),
  }).validate(body);
};
