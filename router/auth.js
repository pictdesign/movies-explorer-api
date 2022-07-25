const express = require('express');
const { createUser, login } = require('../controllers/users');

const router = express.Router();

router.post('/signin', login);

router.post('/signup', createUser);

module.exports = router;
