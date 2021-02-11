import userResolvers from './user';
import profileResolvers from './profile';

export default {
  Profile: {
    ...profileResolvers.Profile,
  },
  Query: {
    ...profileResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...profileResolvers.Mutation,
  },
};
