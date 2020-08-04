const { serializeTicketInput } = require('../../adapters/ticket-input');
const { createTicket } = require('../../factories/create-ticket');
const { baseHandler } = require('../base-handler');

exports.handler = async (event) => baseHandler({
  event,
  serializer: serializeTicketInput,
  useCaseFactory: createTicket,
  logPrefix: 'post-ticket',
});
