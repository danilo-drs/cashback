const { listTicket } = require('../../application/use_cases/list-ticket');
const DynamoRepository = require('../repositories/dynamodb');

exports.listTicket = {
  awsSProvider: (ticketModel) => listTicket(
    ticketModel,
    new DynamoRepository(process.env.TICKET_TABLE_NAME),
  ),
};
