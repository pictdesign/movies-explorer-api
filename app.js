const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./routers/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DATABASE = 'mongodb://localhost:27017/moviedb' } = process.env.port;
const app = express();

mongoose.connect(DATABASE, {
  useNewUrlParser: true,
});

app.use(cookieParser());
app.use(requestLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);

app.use(errorLogger);

app.listen(PORT);
