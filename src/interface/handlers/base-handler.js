const { logger } = require('../../shared/logger');
const { jwtVerify } = require('../../shared/validate-token');

const {
  BAD_REQUEST,
  CREATED,
  SERVER_ERROR,
  UNPROCESSABLE,
} = require('../../shared/enums/http-code').statusCode;

exports.baseHandler = async ({
  event, serializer, useCaseFactory, logPrefix, authenticated = true,
}) => {
  logger.debug(`${logPrefix} input: ${event.body}`);

  // NOTE: this project has an API Gateway Authorizer
  // auth validation is not needed inside lambda in an published environment
  // but SAM does not implement authorizers locally,
  // for this test purpose the authorization was made inside lambda
  if (authenticated) {
    const { Authorization = '' } = event.headers;
    const auth = jwtVerify(Authorization.replace(/Bearer\s*/, ''));
    if (!auth.success) return auth.result;
  }
  const model = await serializer(event.body);

  if (model.errors) {
    logger.debug(`${logPrefix} BAD_REQUEST`);
    return {
      statusCode: BAD_REQUEST,
      body: JSON.stringify({ success: false, errors: model.errors }),
    };
  }

  try {
    const result = await useCaseFactory.awsSProvider(model);
    logger.debug(`${logPrefix} result: ${JSON.stringify(result)}`);
    return {
      statusCode: result.success ? CREATED : UNPROCESSABLE,
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
