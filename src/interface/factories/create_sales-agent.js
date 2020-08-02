const { createSalesAgent } = require('../../application/use_cases/create_sales-agent');
const DynamoRepository = require('../repositories/dynamodb');

exports.createSalesAgent = {
  awsSProvider: (salesAgentModel) => createSalesAgent(
    salesAgentModel,
    new DynamoRepository(process.env.AGENT_TABLE_NAME),
  ),
};
