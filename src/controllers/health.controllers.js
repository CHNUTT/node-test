exports.getHealth = (req, res, next) => {
  res.status(200).json({ appStatus: 'OK' });
};
