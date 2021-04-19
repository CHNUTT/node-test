const express = require('express');
const app = express();
const { ERRORS } = require('./configs/constant');
const { PORT = 4500 } = process.env;

// INFO Register body parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// INFO Load routes
require('./apis/routes/index')(app);

// INFO Error route
app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.msg = error.message || ERRORS.CODE_500_MSG;
  res.status(error.statusCode).json({ error });
});

const init = async function () {
  try {
    if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'testci') {
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