const ERRORS = {
  CODE_500_MSG: 'Internal Server Error!',
  CODE_422_MSG: 'Invalid input(s)',
};

const VALIDATION_MSG = {
  NOT_EMPTY: `Must not be empty`,
  IS_LENGTH: (number) => `Must be at least ${number} character(s)`,
  IS_ALPHA: `Must contain only character(s)`,
  IS_EMAIL: `Invalid Email Format`,
  IS_LENGTH_MIN_MAX: (min, max) =>
    `Must be at least ${min} and less than ${max} characters`,
  PASSWORD_FORMAT: `Password must contain at least one lowercase, one uppercase, one number, and one special character`,
};

module.exports = {
  ERRORS,
  VALIDATION_MSG,
};
