const jwt = require('jsonwebtoken');

const jwtKey = require('../_secrets/keys').jwtKey;

// quickly see what this file exports
//JB - This file exports the middleware that checks
///the token that has been generated.
module.exports = {
  authenticate,
  generateToken,
};

function generateToken(user) {
  console.log('firing');
  const jwtPayload = { 
      ...user,
      hello: 'JokeMan',
      role: 'admin'
  };

  const jwtOptions = {
      expiresIn: '2m',
  };
  console.log(jwtPayload, jwtKey, jwtOptions);
  return jwt.sign(jwtPayload, jwtKey, jwtOptions)

};

// implementation details
function authenticate(req, res, next) {
  const token = req.get('Authorization');

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) return res.status(401).json(err);

      req.decoded = decoded;

      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
}
