import express from 'express';
const app = express();

// Load routes
import routes from './apis/routes/index.js';

app.use('/products', routes.productRoutes);

const PORT = process.env.port || 3000;

app.listen(PORT, () =>
  console.log(`Your application is running on port ${PORT}`)
);
