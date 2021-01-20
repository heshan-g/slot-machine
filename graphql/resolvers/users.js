const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const {
  validateRegisterInput,
  validateLoginInput,
} = require('../../util/validators.js');

const User = require('../../models/User');
const { SECRET_KEY } = require('../../config');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
};

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    // //Login function
    // async login(_, { username, password }) {
    //   //User validation
    //   const { valid, errors } = validateLoginInput(username, password);

    //   if (!valid) {
    //     throw new UserInputError('Error!', { errors });
    //   }

    //   const user = await User.findOne({ username });

    //   if (!user) {
    //     errors.general = 'User not found';
    //     throw new UserInputError('Wrong username', { errors });
    //   }

    //   const passwordMatch = await bcrypt.compare(password, user.password);
    //   if (!passwordMatch) {
    //     errors.general = 'Password is incorrect';
    //     throw new UserInputError('Wrong password', { errors });
    //   }

    //   //Inputs are valid, so create token
    //   const token = generateToken(user);

    //   //Return token and user details
    //   return {
    //     ...user._doc,
    //     id: user.id,
    //     token,
    //   };
    // },

    //Register function
    async register(
      _,
      { registerInput: { email, password, confirmPassword, dateOfBirth } }
    ) {
      //DONE: implement form validation

      const { valid, errors } = validateRegisterInput(
        email,
        password,
        confirmPassword,
        dateOfBirth
      );

      //If there are errors in the errors object, throw error
      if (!valid) {
        //Error here will stop the return at the end of file
        throw new UserInputError('Error!', { errors });
      }

      //DONE: Make sure user doesn't already exist
      //Search for User by username
      const user = await User.findOne({ email });

      //If user exists (not null), throw apollo-server error (caught by apollo-client)
      if (user) {
        //Error here will stop the return at the end of file
        throw new UserInputError('Email already registered', {
          errors: {
            email: 'You are already registered. Please login to continue.',
          },
        });
      }

      //DONE: hash password and create an authentication token
      //Hashes password and saves it into the same input variable (password)
      password = await bcrypt.hash(password, 12);

      //Create new User object of name newUser
      const newUser = new User({
        email,
        password,
        dateOfBirth,
        prizePoints: 0,
        attempts: 50,
        vouchers: [],
        isActive: true,
        // createdAt: new Date().toISOString(),
      });

      //Save newUser
      const res = await newUser.save();

      //Create the web token
      const token = generateToken(res);

      //Return data - I think as response from GQL API?
      return {
        ...res._doc,
        id: res.id,
        token,
      };
    },
  },
};
