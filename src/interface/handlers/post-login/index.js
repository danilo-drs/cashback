const { createReseller } = require('../../factories/create-reseller');
const { logger } = require('../../../shared/logger');
const { serializeLoginInput } = require('../../adapters/login-input');
const { getParameter } = require('../../repositories/parameters');
const { BAD_REQUEST, CREATED, SERVER_ERROR } = require('../../../shared/enums/http-code').statusCode;

exports.handler = async (event) => {
  logger.debug(`post-login input: ${event.body}`);
  await getParameter('/cashbask/jwt/secret');
  const model = await serializeLoginInput(event.body);

  if (model.errors) {
    logger.debug('post-login BAD_REQUEST:');
    return {
      statusCode: BAD_REQUEST,
      body: JSON.stringify({ success: false, errors: model.errors }),
    };
  }

  try {
    const result = await createReseller.awsSProvider(model);
    logger.debug(`post-login result: ${result}`);
    return {
      statusCode: result.success ? CREATED : BAD_REQUEST,
      body: JSON.stringify(result),
    };
  } catch (error) {
    logger.debug(`post-login error: ${error}`);
    return {
      statusCode: SERVER_ERROR,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
