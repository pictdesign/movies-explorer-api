const express = require('express');
const userRouter = require('./router/users');

const PORT = process.env.port || 3000;
const app = express();

app.listen(PORT, () => {
  console.log('Server up');
});
