const rateLimit = require('express-rate-limiter');

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = rateLimiter;
