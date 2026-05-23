export function validateRequest(schema) {
  return (request, response, next) => {
    const { error, value } = schema.validate(request.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return response.status(400).json({
        message: error.details.map((detail) => detail.message).join(" ")
      });
    }

    request.body = value;
    return next();
  };
}
