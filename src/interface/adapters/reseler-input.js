const Joi = require('@hapi/joi');
const { generateHash } = require('../../shared/enums/hash');
const { baseSerializer } = require('./base-serializer');

const resellerInputSchema = Joi.object({
  name: Joi.string().pattern(/^[A-Za-zÀ-ÿ'"`´]+\s+[A-Za-zÀ-ÿ'"`´]+$/).required()
    .messages({
      'string.pattern.base': '"name" value is not a valid full name',
    }),
  cpf: Joi.number().min(1).max(99999999999).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.serializeResellerInput = async (body) => {
  const result = await baseSerializer(body, resellerInputSchema);
  return {
    ...result,
    password: generateHash(result.password),
  };
};
