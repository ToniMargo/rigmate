const Joi = require('joi');

const customerSchema = Joi.object({
  customer_name: Joi.string().required(),

  email: Joi.string().email().lowercase().required(),

  password: Joi.string()
    .min(6)
    .pattern(new RegExp('^(?=.*[A-Z])(?=.*[!@#$%^&*])'))
    .required()
    .messages({
      'string.min': 'Must have at least 6 characters',
      'object.regex': 'Must have at least 6 characters',
      'string.pattern.base': 'Must have at least one capital letter and one special character'
    }),

  address: Joi.string().required(),

  phone: Joi.string().required()
});

module.exports = {
  customerSchema
};
