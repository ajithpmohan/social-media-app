import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import * as authConfig from '../../config/authConfig';
import { models } from '../../models';
import { UserInputError } from 'apollo-server';
import {
  validateLoginInput,
  validateRegisterInput,
} from '../../utils/validators';
import checkAuth from '../../utils/check-auth';

const generateToken = ({ id, email, username }) => {
  // Create an auth token
  return jwt.sign({ id, email, username }, authConfig.SECRET, {
    expiresIn: 86400, // 24 hours
  });
};

export default {
  Profile: {
    __resolveReference: async (ref) => {
      const user = await models.User.findById(ref.id);
      return user.toJSON();
    },
  },
  Query: {
    me: async (_, {}, context) => {
      const user = await checkAuth(context);

      return user.toJSON();
    },
  },
  Mutation: {
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

      const passwordIsMatch = await bcrypt.compare(password, user.password);
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
    register: async (
      _,
      { registerInput: { name, email, password, confirmPassword } },
    ) => {
      // Validate user data
      const { errors, valid } = validateRegisterInput(
        name,
        email,
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
      const username = email.split('@')[0];

      // Hash password & create an auth token
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      user = new models.User({
        name,
        email,
        username,
        password,
        isActive: true,
      });

      await user.save();

      // Create an auth token
      const token = generateToken(user);

      return { ...user.toJSON(), token };
    },
  },
};
