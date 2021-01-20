const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

const { SECRET_KEY } = require('../config');

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    //Format of authHeader is like this: "Bearer [token]", so split accesses only the [token]
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid or Expired token');
      }
    }
    throw new Error("Authentication must be in format 'Bearer [token]'");
  }
  throw new Error('Authorisation header must be provided');
};
