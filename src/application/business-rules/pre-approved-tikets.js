const { ticketStatus } = require('../../shared/enums/ticket-status');

// TODO: The cpf pre-approved list should be soted on a table
const preApprovedList = [15350946056];
const { APPROVED, PENDING } = ticketStatus;
exports.evalPreApproved = (cpf) => (preApprovedList
  .find((cpfPreApproved) => cpfPreApproved === cpf) ? APPROVED : PENDING);
