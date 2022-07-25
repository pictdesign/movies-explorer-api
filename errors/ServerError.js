class ServerError extends Error {
  constructor(message = 'Ошибка сервера, попробуйте позже') {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = ServerError;
