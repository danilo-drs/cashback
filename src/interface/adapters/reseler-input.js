const Joi = require('@hapi/joi');

const reselerInputSchema = Joi.object({
  name: Joi.string().pattern(/^[A-Za-zÀ-ÿ'"`´]+\s+[A-Za-zÀ-ÿ'"`´]+$/).required().messages({
    'string.pattern.base': 'Not a valid full "name"',
  }),
  cpf: Joi.number().min(1).max(99999999999).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.serializeResellerInput = async (body) => {
  let model;
  try {
    model = JSON.parse(body);
  } catch (error) {
    return (
      { errors: ['invalid Json'] }
    );
  }
  let errors = false;
  try {
    await reselerInputSchema.validateAsync(model, { abortEarly: false });
  } catch (err) {
    errors = err.details.reduce((errorList, error) => ([...errorList, error.message]), []);
  }
  return {
    ...model,
    errors,
  };
};
