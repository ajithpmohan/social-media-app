import userResolvers from './user';
import profileResolvers from './profile';

export default {
  Query: {
    ...userResolvers.Query,
    ...profileResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...profileResolvers.Mutation,
  },
};
