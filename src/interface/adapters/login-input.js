const Joi = require('@hapi/joi');
const { baseSerializer } = require('./base-serializer');
const { generateHash } = require('../../shared/enums/hash');

const reselerInputSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.serializeLoginInput = (body) => baseSerializer(body, reselerInputSchema);
exports.serializeLoginInput = async (body) => {
  const result = await baseSerializer(body, reselerInputSchema);
  return {
    ...result,
    password: generateHash(result.password),
  };
};
