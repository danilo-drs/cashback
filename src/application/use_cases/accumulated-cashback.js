exports.accumulatedCashback = async (resellerModel, cashBackService) => {
  const data = await cashBackService(resellerModel.cpf);
  return {
    success: true,
    ...data,
  };
};
