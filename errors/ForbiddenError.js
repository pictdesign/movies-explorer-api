class ForbiddenError extends Error {
  constructor(message = 'Нельзя удалить чужой фильм') {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
