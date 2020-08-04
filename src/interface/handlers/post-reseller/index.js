const { createReseller } = require('../../factories/create-reseller');
const { serializeResellerInput } = require('../../adapters/reseler-input');
const { baseHandler } = require('../base-handler');

exports.handler = async (event) => baseHandler({
  event,
  serializer: serializeResellerInput,
  useCaseFactory: createReseller,
  logPrefix: 'post-reseller',
});
