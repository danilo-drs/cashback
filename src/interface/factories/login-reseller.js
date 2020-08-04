const { loginReseller } = require('../../application/use_cases/login-reseller');
const LoginDynamoRepository = require('../repositories/login-dynamodb');

exports.loginReseller = {
  awsSProvider: (resellerModel) => loginReseller(
    resellerModel,
    new LoginDynamoRepository(process.env.RESELLER_TABLE_NAME),
  ),
};
