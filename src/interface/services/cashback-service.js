const axios = require('axios');

exports.cashbackService = async (cpf) => {
  const config = {
    method: 'get',
    url: 'https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf=15350946056',
    headers: {
      token: 'ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm',
    },
  };

  return axios(config).then((response) => response.data.body);
};
