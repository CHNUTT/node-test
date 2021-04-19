const express = require('express');
const UserControllers = require('../../controllers/user.controllers');
const Validators = require('../validators');

const router = express.Router();

module.exports = (app) => {
  router.post(
    '/user',
    Validators.userCreateValidationRules(),
    Validators.validate,
    UserControllers.createUser
  );
  app.use('/api', router);
};
