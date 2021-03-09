import userResolvers from './user';

export default {
  Profile: {
    ...userResolvers.Profile,
  },
  // Query: {
  //   ...userResolvers.Query,
  // },
  Mutation: {
    ...userResolvers.Mutation,
  },
};
