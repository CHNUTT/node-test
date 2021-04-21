const { validationResult } = require('express-validator');
const userCreateValidationRules = require('./user-create.validator');
const createError = require('../../utils/createError');
const { ERRORS } = require('../../configs/constant');

const validate = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      throw createError(ERRORS.CODE_422_MSG, 422, errors.errors);
    next();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  validate,
  userCreateValidationRules,
};
