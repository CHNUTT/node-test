const express = require('express');
const app = express();
const { PORT = 4500 } = process.env;

// Load routes
require('./apis/routes/index')(app);

const init = async function () {
  try {
    if (
      process.env.NODE_ENV !== 'test' &&
      process.env.NODE_ENV !== 'testci'
    ) {
      app.listen(PORT, () =>
        console.log(`Your application is running on port ${PORT}`)
      );
    }
    return app;
  } catch (error) {
    throw error;
  }
};

init();

module.exports = init;
