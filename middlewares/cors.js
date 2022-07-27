const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,DELETE';

const allowedCors = [
  'localhost:3000',
  'http://localhost:3000',
  'https://localhost:3000',
  'pictmovies.nomoredomains.xyz/',
  'http://pictmovies.nomoredomains.xyz/',
  'https://pictmovies.nomoredomains.xyz/',
];

const Cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.headers('Access-Control-Allow-origin', origin);
    res.headers('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.status(200).end();
  }
  next();
  return true;
};

module.exports = Cors;
