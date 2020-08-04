exports.baseSerializer = async (body, inputSchema) => {
  let model;
  try {
    model = JSON.parse(body);
  } catch (error) {
    return (
      { errors: ['invalid Json'] }
    );
  }
  let errors;
  try {
    await inputSchema.validateAsync(model, { abortEarly: false });
  } catch (err) {
    errors = err.details.reduce((errorList, error) => ([...errorList, error.message]), []);
  }
  return {
    ...model,
    errors,
  };
};
