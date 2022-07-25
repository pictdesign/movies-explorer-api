const Error = (err, req, res, next) => {
  const { statusCode, message } = err;
  if (statusCode) {
    res.status(statusCode).send({ message });
  }
  next();
};

module.exports = Error;
