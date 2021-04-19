const userRoutes = require('./user.routes');
const healthRoutes = require('./health.routes');

module.exports = (app, server) => {
  userRoutes(app);
  healthRoutes(app);
};
