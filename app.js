const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./router/index');

const PORT = process.env.port || 3000;
const app = express();

mongoose.connect('mongodb://localhost:27017/moviedb', {
  useNewUrlParser: true,
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);

app.listen(PORT);
