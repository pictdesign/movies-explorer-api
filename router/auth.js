const express = require('express');
const { createUser, login, logout } = require('../controllers/users');

const router = express.Router();

router.post('/signin', login);

router.post('/signup', createUser);

router.get('/signout', logout);

module.exports = router;
