const jwt = require('jsonwebtoken');
const { loginReseller } = require('../../factories/login-reseller');
const { logger } = require('../../../shared/logger');
const { serializeLoginInput } = require('../../adapters/login-input');
const {
  BAD_REQUEST,
  UNAUTHIRIZED,
  SERVER_ERROR,
  OK,
} = require('../../../shared/enums/http-code').statusCode;

exports.handler = async (event) => {
  logger.debug(`post-login input: ${event.body}`);
  const model = await serializeLoginInput(event.body);

  if (model.errors) {
    logger.debug('post-login BAD_REQUEST:');
    return {
      statusCode: BAD_REQUEST,
      body: JSON.stringify({ success: false, errors: model.errors }),
    };
  }

  try {
    const result = await loginReseller.awsSProvider(model);
    if (result.success) {
      result.token = jwt.sign(result.reseller, process.env.JWT_SECRET, { expiresIn: '1h' });
    }
    logger.debug(`post-login result: ${result}`);
    return {
      statusCode: result.success ? OK : UNAUTHIRIZED,
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
