const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const { baseSerializer } = require('./base-serializer');
const { ticketStatus } = require('../../shared/enums/ticket-status');

const ticketInputSchema = Joi.object({
  code: Joi.number().required(),
  amount: Joi.number().min(1).required(),
  date: Joi.date().format('YYYY-MM-DD').utc().required(),
  cpf: Joi.number().min(1).max(99999999999).required(),
});

exports.serializeTicketInput = async (body) => {
  const result = await baseSerializer(body, ticketInputSchema);
  const status = ticketStatus.PENDING;

  return { ...result, status };
};
