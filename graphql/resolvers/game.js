const { UserInputError } = require('apollo-server');

const User = require('../../models/User');
const checkAuth = require('../../util/check-auth');
const { SECRET_KEY } = require('../../config');

module.exports = {
  Mutation: {
    async play(_, { points }, context) {
      //Check user authentication
      const userAuth = checkAuth(context);

      try {
        //Get user from DB and update
        const user = await User.findById(userAuth.id);

        user.prizePoints += points;
        user.attempts -= 1;

        await user.save();

        //Return updated user details
        return {
          prizePoints: user.prizePoints,
          attempts: user.attempts,
          vouchers: user.vouchers,
          isActive: user.isActive,
        };
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
