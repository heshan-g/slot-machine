const gameResolvers = require('./game');
const usersResolvers = require('./users');

module.exports = {
  // Query: {
  //   ...postsResolvers.Query,
  // },
  Mutation: {
    ...usersResolvers.Mutation,
    ...gameResolvers.Mutation,
  },
};
