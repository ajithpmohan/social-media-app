import postResolvers from './post';
import commentResolvers from './comment';

export default {
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
};
