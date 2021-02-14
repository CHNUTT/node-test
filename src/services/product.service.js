const add = require('./calculation/add');

const getProduct = (req, res, next) => {
  res.send(`10 + 20 = ${add(10, 20)}`);
};

module.exports = { getProduct };
