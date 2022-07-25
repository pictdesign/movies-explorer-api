const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const rateLimiter = require('./utils/ratelimiter');
const router = require('./routers/index');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DATABASE = 'mongodb://localhost:27017/moviedb' } = process.env;
const app = express();

mongoose.connect(DATABASE, {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(rateLimiter);
app.use(cookieParser());
app.use(requestLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);

app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT);
