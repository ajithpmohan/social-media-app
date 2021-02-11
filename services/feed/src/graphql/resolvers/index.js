import commentResolvers from './comment';
import likeResolvers from './like';
import postResolvers from './post';

export default {
  Post: {
    ...postResolvers.Post,
  },
  Comment: {
    ...commentResolvers.Comment,
  },
  Query: {
    ...postResolvers.Query,
    ...commentResolvers.Query,
  },
  Mutation: {
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
    ...likeResolvers.Mutation,
  },
};
