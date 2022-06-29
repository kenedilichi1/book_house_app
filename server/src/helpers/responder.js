function successResponder(expResponse, payload, description = "") {
  return expResponse.status(200).json({
    error: false,
    description,
    payload,
  });
}

function errorResponder(response, description, statusCode) {
  return response.status(statusCode).json({
    error: true,
    description,
    payload: null,
  });
}

module.exports = {
  successResponder,
  errorResponder,
};
