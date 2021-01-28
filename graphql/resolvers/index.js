const gameResolvers = require('./game');
const usersResolvers = require('./users');

module.exports = {
  Query: {
    ...usersResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...gameResolvers.Mutation,
  },
};
