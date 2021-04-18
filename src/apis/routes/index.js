const productRoutes = require('./product.routes');
const healthRoutes = require('./health.routes');

module.exports = (app, server) => {
  productRoutes(app);
  healthRoutes(app);
};
