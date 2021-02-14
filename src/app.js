const express = require('express');
const app = express();

// Load routes
const routes = require('./apis/routes/index');

app.use('/products', routes.productRoutes);

const PORT = process.env.port || 3000;

app.listen(PORT, () =>
  console.log(`Your application is running on port ${PORT}`)
);
