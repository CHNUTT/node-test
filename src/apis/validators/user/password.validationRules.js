const { body } = require('express-validator');
const { VALIDATION_MSG } = require('../../../configs/constant');

module.exports = () =>
  body('password')
    .notEmpty()
    .withMessage(VALIDATION_MSG.NOT_EMPTY)
    .bail()
    .isLength({ min: 8, max: 16 })
    .withMessage(VALIDATION_MSG.IS_LENGTH_MIN_MAX(8, 16))
    .bail()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/)
    .withMessage(VALIDATION_MSG.PASSWORD_FORMAT)
    .bail();
