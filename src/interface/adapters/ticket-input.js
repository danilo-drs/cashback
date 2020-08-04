const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const { baseSerializer } = require('./base-serializer');

const ticketInputSchema = Joi.object({
  code: Joi.number().required(),
  amount: Joi.number().min(1).required(),
  date: Joi.date().format('YYYY-MM-DD').utc(),
  cpf: Joi.number().min(1).max(99999999999).required(),
});

exports.serializeLoginInput = (body) => baseSerializer(body, ticketInputSchema);
