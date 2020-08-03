const { createReseller } = require('../../factories/create-reseller');
const { logger } = require('../../../shared/logger');
const { serializeResellerInput } = require('../../adapters/reseler-input');
const { BAD_REQUEST, CREATED, SERVER_ERROR } = require('../../../shared/enums/http-code').statusCode;

exports.handler = async (event) => {
  logger.debug(`post-reseller input: ${event.body}`);

  const model = await serializeResellerInput(event.body);

  if (model.errors) {
    logger.debug('post-reseller BAD_REQUEST:');
    return {
      statusCode: BAD_REQUEST,
      body: JSON.stringify({ errors: model.errors }),
    };
  }

  try {
    const result = await createReseller.awsSProvider(model);
    logger.debug(`post-reseller result: ${result}`);
    return {
      statusCode: result.success ? CREATED : BAD_REQUEST,
      body: JSON.stringify(result),
    };
  } catch (error) {
    logger.debug(`post-reseller error: ${error}`);
    return {
      statusCode: SERVER_ERROR,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
