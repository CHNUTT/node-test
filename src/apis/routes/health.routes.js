const router = require('express').Router();
const HealthControllers = require('../../controllers/health.controllers');

module.exports = (app) => {
  // Health route
  router.get('/', HealthControllers.getHealth);
  app.use(router);
};
