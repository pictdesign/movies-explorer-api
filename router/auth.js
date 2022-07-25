const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { createUser, login, logout } = require('../controllers/users');

const router = express.Router();

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.sting().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

router.get('/signout', logout);

module.exports = router;
