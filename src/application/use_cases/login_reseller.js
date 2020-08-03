exports.loginReseller = async (resellerModel, resellerRepository) => {
  const savedData = await resellerRepository.save(resellerModel);

  return {
    success: !savedData.error,
    reseller: savedData,
    error: savedData.error,
  };
};
