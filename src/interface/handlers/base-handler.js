const { logger } = require('../../shared/logger');
const {
  BAD_REQUEST,
  CREATED,
  SERVER_ERROR,
  UNPROCESSABLE,
} = require('../../shared/enums/http-code').statusCode;

exports.baseHandler = async ({
  event, serializer, useCaseFactory, logPrefix,
}) => {
  logger.debug(`${logPrefix} input: ${event.body}`);

  const model = await serializer(event.body);
  console.log('-----------------------------------> ', event.body, model);
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
