const Joi = require("joi");

module.exports = (body) => {
  return Joi.object({
    tweetUrl: Joi.string().required(),
    requiredCommentText: Joi.string().required(),
    reward: Joi.number().required(),
    stock: Joi.number(),
  }).validate(body);
};
