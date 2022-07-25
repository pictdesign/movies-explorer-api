const { checkToken } = require('../helpers/jwt');
const User = require('../models/user');

const isAuthorized = (req, res, next) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    throw new Error('Токен неверный');
  }
  let payload;
  try {
    payload = checkToken(jwt);
    User.findOne({ id: payload })
      .then((user) => {
        if (!user) {
          throw new Error();
        }
      })
      .catch((error) => next(error));
  } catch (error) {
    throw new Error();
  }
  req.user = payload;
  next();
};

module.exports = isAuthorized;
