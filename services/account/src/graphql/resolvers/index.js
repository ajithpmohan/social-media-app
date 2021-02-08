import userResolvers from './user';
import profileResolvers from './profile';

export default {
  User: {
    ...userResolvers.User,
  },
  Query: {
    ...userResolvers.Query,
    ...profileResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...profileResolvers.Mutation,
  },
};
