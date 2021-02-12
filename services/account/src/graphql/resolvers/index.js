import userResolvers from './user';

export default {
  Profile: {
    ...userResolvers.Profile,
  },
  User: {
    ...userResolvers.User,
  },
  Query: {
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
};
