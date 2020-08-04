const { accumulatedCashback } = require('./accumulated-cashback');
const { createReseller } = require('./create-reseller');
const { createTicket } = require('./create-ticket');
const { listTicket } = require('./list-ticket');
const { loginReseller } = require('./login-reseller');

module.exports = {
  accumulatedCashback,
  createReseller,
  createTicket,
  listTicket,
  loginReseller,
};
