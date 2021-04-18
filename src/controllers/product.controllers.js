exports.getProduct = (req, res, next) => {
  res.status(200).json({ product: { name: 'test' } });
};
