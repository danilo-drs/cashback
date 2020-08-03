const Joi = require('@hapi/joi');
const { generateHash } = require('../../shared/enums/hash');

const reselerInputSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.serializeLoginInput = async (body) => {
  let model;
  try {
    model = JSON.parse(body);
  } catch (error) {
    return (
      { errors: ['invalid Json'] }
    );
  }
  let errors;
  try {
    await reselerInputSchema.validateAsync(model, { abortEarly: false });
  } catch (err) {
    errors = err.details.reduce((errorList, error) => ([...errorList, error.message]), []);
  }
  return {
    ...model,
    password: generateHash(model.password),
    errors,
  };
};
