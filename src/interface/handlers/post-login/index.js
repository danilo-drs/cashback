const { loginReseller } = require('../../factories/login-reseller');
const { logger } = require('../../../shared/logger');
const { serializeLoginInput } = require('../../adapters/login-input');
const { baseHandler } = require('../base-handler');
const {
  UNAUTHIRIZED,
  UNPROCESSABLE,
  OK,
} = require('../../../shared/enums/http-code').statusCode;

exports.handler = async (event) => {
  const result = await baseHandler({
    event,
    serializer: serializeLoginInput,
    useCaseFactory: loginReseller,
    logPrefix: 'post-login',
  });
  if (result.success) result.statusCode = OK;
  if (result.statusCode === UNPROCESSABLE) result.statusCode = UNAUTHIRIZED;

  logger.debug(`post-login result: ${JSON.stringify(result)}`);
  return result;
};
