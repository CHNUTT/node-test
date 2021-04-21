module.exports = (msg, code, errors) => {
  const error = new Error(msg);
  if (code) error.statusCode = code;
  if (errors) error.errors = errors;
  return error;
};
