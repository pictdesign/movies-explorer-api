const express = require('express');
const isAuthorized = require('../middlewares/authorized');
const userRouter = require('./users');
const authRouter = require('./auth');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');

const router = express.Router();
router.use('/', authRouter);
router.use('/users', isAuthorized, userRouter);
router.use('/movies', isAuthorized, moviesRouter);
router.use('*', isAuthorized, (req, res, next) => {
  next(new NotFoundError());
});

module.exports = router;
