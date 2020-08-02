exports.createSalesAgent = async (salesAgentModel, salesAgentRepository) => {
  const savedData = await salesAgentRepository.save(salesAgentModel);
  const success = !savedData.error;
  if (!success) return { success, error: savedData.error };

  return { success, salesAgent: savedData };
};
