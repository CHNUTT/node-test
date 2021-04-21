const { body } = require('express-validator');
const { VALIDATION_MSG } = require('../../../configs/constant');

module.exports = () =>
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage(VALIDATION_MSG.NOT_EMPTY)
    .bail()
    .isLength({ min: 3 })
    .withMessage(VALIDATION_MSG.IS_LENGTH(3))
    .bail()
    .isAlpha()
    .withMessage(VALIDATION_MSG.IS_ALPHA)
    .bail()
    .toLowerCase();
