const bcrypt = require('bcryptjs');
const { generateToken, checkToken } = require('../helpers/jwt');
const User = require('../models/user');

const getUser = (req, res, next) => {

};

const updateUser = (req, res, next) => {

};

const createUser = async (req, res, next) => {
  const {
    email, password, name
  } = req.body;
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      throw new Error();
    }
    if (!email || !password || !name) {
      throw new Error();
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      email, password: hashPassword, name,
    });
    res.status(201).send(createdUser);
  } catch (error) {
    next(error);
  }
};

const login = (req, res, next) => {
  const {
    email, password,
  } = req.body;
  if (!email || !password) {
    throw new Error();
  }
  return User.findByCredentials(email, password)
    .then((user) => {
      const token = generateToken(user._id);
      res
        .cookie('jwt', token, {
          maxAge: 3600 * 24 * 3,
          secure: true,
          httpOnly: true,
        })
        .send(user);
    })
    .catch((error) => next(error));
};

const logout = (req, res, next) => {

};

module.exports = {
  getUser,
  updateUser,
  createUser,
  login,
  logout,
};
