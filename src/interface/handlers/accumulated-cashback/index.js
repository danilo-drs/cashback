const { logger } = require('../../../shared/logger');
const { accumulatedCashback } = require('../../factories/accumulated-cashback');
const { jwtVerify } = require('../../../shared/validate-token');
const {
  SERVER_ERROR,
  OK,
} = require('../../../shared/enums/http-code').statusCode;

const logPrefix = 'accumulated-cashback';
exports.handler = async (event) => {
  logger.debug(`${logPrefix} input: ${event.body}`);

  // NOTE: this project has an API Gateway Authorizer
  // auth validation is not needed inside lambda in an published environment
  // but SAM does not implement authorizers locally,
  // for this test purpose the authorization was made inside lambda
  const { Authorization = '' } = event.headers;
  const auth = jwtVerify(Authorization.replace(/Bearer\s*/, ''));
  if (!auth.success) return auth.result;

  const { cpf } = event.pathParameters;

  try {
    const result = await accumulatedCashback.externalProvider({ cpf: parseFloat(cpf) });
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
