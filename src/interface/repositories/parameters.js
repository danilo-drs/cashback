const AWS = require('aws-sdk');

const ssm = new AWS.SSM();

exports.getParameter = async (name) => {
  const parameter = ssm.getParameter({ Name: name }).promise();
  console.log(parameter);
  return parameter;
};
