const axios = require('axios');

exports.cashbackService = async (cpf) => {
  const config = {
    method: 'get',
    url: `${process.env.CASH_BACK_SERVICE_URL}?cpf=${cpf}`,
    headers: {
      token: process.env.CASH_BACK_SERVICE_TOKEN,
    },
  };

  return axios(config).then((response) => response.data.body);
};
