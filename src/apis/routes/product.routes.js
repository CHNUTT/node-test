const express = require('express');
const ProductController = require('../../controllers/product.controllers');

const router = express.Router();

module.exports = (app) => {
  router.get('/products', ProductController.getProduct);
  app.use('/api', router);
};
