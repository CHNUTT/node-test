const { body } = require('express-validator');
const { VALIDATION_MSG } = require('../../../configs/constant');

module.exports = () =>
  body('email')
    .trim()
    .notEmpty()
    .withMessage(VALIDATION_MSG.NOT_EMPTY)
    .bail()
    .isEmail()
    .withMessage(VALIDATION_MSG.IS_EMAIL)
    .bail()
    .toLowerCase();
