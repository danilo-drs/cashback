// TODO: The cashback ranges list should be soted on a table
const cashbackRanges = [
  { from: -1, to: 1000, rate: 0.10 },
  { from: 999, to: 1500, rate: 0.15 },
  { from: 1499, rate: 0.20 },
];

exports.cashBackRate = (amount) => {
  const { rate: refoundRate } = cashbackRanges
    .find((range) => amount > range.from && amount < (range.to || amount + 1));
  return {
    refoundRate,
    refundAmount: amount * refoundRate,
  };
};
