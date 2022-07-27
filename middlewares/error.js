const Error = (err, req, res, next) => {
  const { statusCode = 500, message = 'Ошибка сервера, попробуйте позже' } = err;
  res.status(statusCode).send({ message });
  next();
};

module.exports = Error;
