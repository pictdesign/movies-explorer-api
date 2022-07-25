const express = require('express');
const { getUser, updateUser } = require('../controllers/users.js');

const router = express.Router();

router.get('/users/me', getUser);

router.patch('/users/me', updateUser);

module.exports = router;
