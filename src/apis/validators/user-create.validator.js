const lastNameValidatorRules = require('./user/lastName.validationRules');
const firstNameValidatorRules = require('./user/firstName.validationRules');
const emailValidatorRules = require('./user/email.validationRules');
const passwordValidatorRules = require('./user/password.validationRules');

module.exports = () => [
  firstNameValidatorRules(),
  lastNameValidatorRules(),
  emailValidatorRules(),
  passwordValidatorRules(),
];
