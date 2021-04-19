const { User } = require('../sequelize/models');
const createError = require('../utils/createError');
const { ERRORS } = require('../configs/constant');
const { validationResult } = require('express-validator');

/**
 * INFO Insert new user into database
 */
exports.createUser = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty())
      throw createError(ERRORS.CODE_422_MSG, 422, error.errors);
    const { firstName, lastName, email, password } = req.body;
    const createdUser = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    if (!createdUser) throw createError();

    const user = {
      id: createdUser.id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      email: createdUser.email,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    };

    res.status(201).json({ createdUser: user });
  } catch (err) {
    next(err);
  }
};
