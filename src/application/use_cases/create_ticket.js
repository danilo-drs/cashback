const { logger } = require('../../shared/logger');

exports.createTicket = async (ticketModel, ticketRepository) => {
  logger.debug(`createTicket usecase input: ${JSON.stringify(ticketModel)}`);
  const savedData = await ticketRepository.save(ticketModel);

  logger.debug(`createTicket usecase savedData: ${JSON.stringify(savedData)}`);
  return {
    success: !savedData.error,
    ticket: savedData,
    error: savedData.error,
  };
};
