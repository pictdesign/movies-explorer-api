const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/jwt');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const DuplicateError = require('../errors/DuplicateError');
const AuthorizationError = require('../errors/AuthorizationError');

const getMe = async (req, res, next) => {
  const userId = req.user.payload;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

const updateMe = async (req, res, next) => {
  const userId = req.user.payload;
  const {
    email, name,
  } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { email, name },
      { new: true, runValidators: true },
    );
    if (!user) {
      throw new BadRequestError();
    }
    res.status(200).send({
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    if (error.code === 11000) {
      next(new DuplicateError());
    }
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      throw new DuplicateError();
    }
    if (!email || !password || !name) {
      throw new BadRequestError();
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      email, password: hashPassword, name,
    });
    const token = generateToken(createdUser.id);
    res
      .status(201)
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 3,
        httpOnly: true,
      })
      .status(201)
      .send({
        email: createdUser.email,
        name: createdUser.name,
      });
  } catch (error) {
    next(error);
  }
};

const login = (req, res, next) => {
  const {
    email, password,
  } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken(user.id);
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 3,
          httpOnly: true,
        })
        .status(200)
        .send({
          email: user.email,
          name: user.name,
        });
    })
    .catch(() => next(new AuthorizationError()));
};

const logout = (req, res, next) => {
  try {
    res
      .status(200)
      .clearCookie('jwt')
      .send({ message: 'Возвращайтесь как можно скорее' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMe,
  updateMe,
  createUser,
  login,
  logout,
};
