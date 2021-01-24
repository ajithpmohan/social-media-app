import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import * as authConfig from '../../config/authConfig';
import { models } from '../../models';
import { UserInputError } from 'apollo-server';
import checkAuth from '../../utils/check-auth';
import {
  validateLoginInput,
  validateRegisterInput,
} from '../../utils/validators';

const generateToken = ({ id, email, username }) => {
  // Create an auth token
  return jwt.sign({ id, email, username }, authConfig.SECRET, {
    expiresIn: 86400, // 24 hours
  });
};

export default {
  Query: {
    login: async (_, { loginInput: { email, password } }) => {
      // Validate user data
      const { errors, valid } = validateLoginInput(email, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      // Make sure that email & password are correct
      const user = await models.User.findOne({ email });
      if (!user) {
        throw new UserInputError('User not found', {
          errors: {
            nonfield: 'User not found',
          },
        });
      }

      const passwordIsMatch = await bcrypt.compare(
        password,
        user.password,
      );
      if (!passwordIsMatch) {
        throw new UserInputError('Wrong Credentials', {
          errors: {
            nonfield: 'Incorrect Password',
          },
        });
      }

      // Create an auth token
      const token = generateToken(user);

      return { ...user.toJSON(), token };
    },
    getAuthUser: async (_, {}, context) => {
      // verify auth token
      const user = await checkAuth(context);

      // Create an auth token
      const token = generateToken(user);

      return { ...user.toJSON(), token };
    },
  },
  Mutation: {
    register: async (
      _,
      {
        registerInput: { email, username, password, confirmPassword },
      },
    ) => {
      // Validate user data
      const { errors, valid } = validateRegisterInput(
        email,
        username,
        password,
        confirmPassword,
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      // Make sure user doesn't exist
      let user = await models.User.findOne({ email });
      if (user) {
        throw new UserInputError('Email is taken', {
          errors: {
            email: 'This email is taken',
          },
        });
      }

      user = await models.User.findOne({ username });
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            email: 'This Username is taken',
          },
        });
      }

      // Hash password & create an auth token
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      user = new models.User({
        email,
        username,
        password,
        isActive: true,
      });

      const res = await user.save();

      // Create an auth token
      const token = generateToken(res);

      return { ...res.toJSON(), token };
    },
  },
};
