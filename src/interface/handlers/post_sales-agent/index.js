const { createSalesAgent } = require('../../factories/create_sales-agent');
const { logger } = require('../../../shared/logger');

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  logger.debug({ body });
  // TODO: data model validation
  try {
    const result = await createSalesAgent.awsSProvider(body);
    logger.debug({ result });
    return {
      statusCode: result.success ? 200 : 400,
      body: result,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: { error },
    };
  }
};
