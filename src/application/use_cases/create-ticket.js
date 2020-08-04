const { logger } = require('../../shared/logger');
const { evalPreApproved } = require('../business-rules/pre-approved-tickets');
const { cashBackRate } = require('../business-rules/cashback-rate');

exports.createTicket = async (ticketModel, ticketRepository) => {
  logger.debug(`createTicket usecase input: ${JSON.stringify(ticketModel)}`);

  const { refoundRate, refundAmount } = cashBackRate(ticketModel.amount);
  const status = evalPreApproved(ticketModel.cpf);
  const ticket = {
    ...ticketModel,
    status,
    refoundRate,
    refundAmount,
  };
  const savedData = await ticketRepository.save(ticket);

  logger.debug(`createTicket usecase savedData: ${JSON.stringify(savedData)}`);
  return {
    success: !savedData.error,
    ticket: savedData,
    error: savedData.error,
  };
};
