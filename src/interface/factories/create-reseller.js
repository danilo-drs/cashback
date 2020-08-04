const { createReseller } = require('../../application/use_cases/create-reseller');
const DynamoRepository = require('../repositories/dynamodb');

exports.createReseller = {
  awsSProvider: (resellerModel) => createReseller(
    resellerModel,
    new DynamoRepository(process.env.RESELLER_TABLE_NAME),
  ),
};
