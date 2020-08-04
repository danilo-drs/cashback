const { cashbackService } = require('../services/cashback-service');
const { accumulatedCashback } = require('../../application/use_cases/accumulated-cashback');

exports.accumulatedCashback = {
  externalProvider: (ticketModel) => accumulatedCashback(
    ticketModel,
    cashbackService,
  ),
};
