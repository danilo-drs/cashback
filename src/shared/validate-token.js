const jwt = require('jsonwebtoken');
const { statusCode } = require('./enums/http-code');

exports.jwtVerify = (token) => {
  if (!token) return { success: false, result: { statusCode: statusCode.UNAUTHIRIZED } };
  try {
    const reseller = jwt.verify(token, process.env.JWT_SECRET);
    return { success: true, reseller };
  } catch (err) {
    return { success: false, result: { statusCode: statusCode.FORBIDDEN } };
  }
};
