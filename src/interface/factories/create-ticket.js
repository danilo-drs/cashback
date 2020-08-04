const DynamoRepository = require('../repositories/dynamodb');
const { createTicket } = require('../../application/use_cases/create-ticket');

exports.createTicket = {
  awsSProvider: (ticketModel) => createTicket(
    ticketModel,
    new DynamoRepository(process.env.TICKET_TABLE_NAME),
  ),
};
