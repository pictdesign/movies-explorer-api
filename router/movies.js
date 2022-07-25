const express = require('express');

const router = express.Router();

router.get('/movies');

router.post('/movies');

router.delete('/movies/:id');

module.exports = router;
