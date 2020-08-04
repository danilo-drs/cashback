const { logger } = require('../../../shared/logger');
const { listTicket } = require('../../factories/list-ticket');
const {
  SERVER_ERROR,
  OK,
} = require('../../../shared/enums/http-code').statusCode;

const logPrefix = 'list-ticket';
exports.handler = async (event) => {
  logger.debug(`${logPrefix} input: ${event.body}`);

  const { cpf } = event.pathParameters;

  try {
    const result = await listTicket.awsSProvider({ cpf: parseFloat(cpf) });
    logger.debug(`${logPrefix} result: ${JSON.stringify(result)}`);
    return {
      statusCode: OK,
      body: JSON.stringify(result),
    };
  } catch (error) {
    logger.error(`${logPrefix} error: ${error}`);
    return {
      statusCode: SERVER_ERROR,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
