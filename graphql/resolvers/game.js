const { UserInputError } = require('apollo-server');

const User = require('../../models/User');
const checkAuth = require('../../util/check-auth');
// const { SECRET_KEY } = require('../../config');

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
    async redeemPoints(_, { voucherID }, context) {
      //Check user authentication
      const userAuth = checkAuth(context);

      try {
        //Get user from DB and update
        const user = await User.findById(userAuth.id);

        const value = 1000;

        user.prizePoints -= value;
        user.vouchers = [...user.vouchers, { voucherID, value }];

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
    async useCoupon(_, { voucherID }, context) {
      //Check user authentication
      const userAuth = checkAuth(context);

      try {
        //Get user from DB and update
        const user = await User.findById(userAuth.id);

        for (let i = 0; i < user.vouchers.length; i++) {
          if (user.vouchers[i].voucherID === voucherID) {
            await user.vouchers.splice(i, 1);
          }
        }

        user.save();

        //Return updated game state
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
