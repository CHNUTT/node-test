const express = require('express');
const app = express();
const { PORT = 4500 } = process.env;

// Load routes
const routes = require('./apis/routes/index');

app.use('/products', routes.productRoutes);

app.listen(PORT, () =>
  console.log(`Your application is running on port ${PORT}`)
);
