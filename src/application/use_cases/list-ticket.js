exports.listTicket = async (ticketModel, ticketRepository) => {
  const tickets = await ticketRepository.getById({ key: 'cpf', value: ticketModel.cpf });

  return { tickets: tickets.items, count: tickets.count };
};
