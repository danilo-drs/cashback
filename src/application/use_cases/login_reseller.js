const { logger } = require('../../shared/logger');

exports.loginReseller = async (resellerModel, resellerRepository) => {
  logger.debug(`loginReseller usecase input: ${JSON.stringify(resellerModel)}`);
  const { email, password } = resellerModel;
  const findResult = await resellerRepository.get({ email });
  const [loginData = {}] = findResult.Items;
  if (loginData.password === password) {
    delete loginData.password;
    logger.debug(`loginReseller usecase loginData: ${JSON.stringify(loginData)}`);
    return {
      success: true,
      reseller: loginData,
    };
  }
  return {
    success: false,
  };
};
