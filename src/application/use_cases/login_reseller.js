const jwt = require('jsonwebtoken');
const { logger } = require('../../shared/logger');

exports.loginReseller = async (resellerModel, loginRepository) => {
  logger.debug(`loginReseller usecase input: ${JSON.stringify(resellerModel)}`);
  const { email, password } = resellerModel;
  const findResult = await loginRepository.get({ email });
  const [loginData = {}] = findResult.Items;
  if (loginData.password === password) {
    delete loginData.password;

    const result = {
      success: true,
      reseller: loginData,
      token: jwt.sign(loginData, process.env.JWT_SECRET, { expiresIn: '1h' }),
    };
    logger.debug(`loginReseller usecase result: ${JSON.stringify(result)}`);
    return result;
  }
  return {
    success: false,
  };
};
