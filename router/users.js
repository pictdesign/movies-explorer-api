const express = require('express');
const { getMe, updateMe } = require('../controllers/users');

const router = express.Router();

router.get('/me', getMe);

router.patch('/me', updateMe);

module.exports = router;
