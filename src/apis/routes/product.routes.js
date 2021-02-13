import express from 'express';
import services from '../../services/index.js';

const Router = express.Router();

Router.get('/', services.productController.getProduct);

export default Router;
