import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';

import * as authConfig from '../config/authConfig';
import { models } from '../models';

export default async ({
  req: {
    headers: { authorization },
  },
}) => {
  if (authorization) {
    const token = authorization.split('Bearer ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, authConfig.SECRET);
        const user = await models.User.findById(decoded.id);
        if (!user) {
          throw new Error();
        }
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new AuthenticationError(
      "Authorization token must be 'Bearer [token]'",
    );
  }
  throw new AuthenticationError('Authentication header must be provided');
};
