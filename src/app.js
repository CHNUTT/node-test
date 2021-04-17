const express = require('express');
const app = express();
const { PORT = 4500 } = process.env;

// Load routes
const routes = require('./apis/routes/index');

// Product routes
app.use('/products', routes.productRoutes);

// Health route
app.use('/', (req, res, next) => {
  res.send('application is up and running!');
});

app.listen(PORT, () =>
  console.log(`Your application is running on port ${PORT}`)
);
