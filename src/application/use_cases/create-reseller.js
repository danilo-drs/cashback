exports.createReseller = async (resellerModel, resellerRepository) => {
  const savedData = await resellerRepository.save(resellerModel);
  delete savedData.password;
  return {
    success: !savedData.error,
    reseller: savedData,
    error: savedData.error,
  };
};
