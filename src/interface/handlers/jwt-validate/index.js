const { jwtVerify } = require('../../../shared/validate-token');

const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

exports.handler = (event, context, callback) => {
  const token = event.authorizationToken;
  if (!token) callback('Unauthorized');
  else if (jwtVerify(token).success) callback(null, generatePolicy('user', 'Allow', event.methodArn));
  else callback(null, generatePolicy('user', 'Deny', event.methodArn));
};
