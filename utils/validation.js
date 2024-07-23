const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().required(),

  email: Joi.string().email().lowercase().required(),

  password: Joi.string()
    .min(6)
    .pattern(new RegExp('^(?=.*[A-Z])(?=.*[!@#$%^&*])'))
    .required()
    .messages({
      'string.min': 'Must have at least 6 characters',
      'object.regex': 'Must have at least 6 characters',
      'string.pattern.base': 'Must have at least one capital letter and one special character'
    })
});

module.exports = {
  userSchema
};
