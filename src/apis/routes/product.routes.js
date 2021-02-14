const express = require('express');
const services = require('../../services/index');

const Router = express.Router();

Router.get('/', services.productController.getProduct);

module.exports = Router;
