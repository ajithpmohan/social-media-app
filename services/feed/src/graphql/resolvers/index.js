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
  Like: {
    ...likeResolvers.Like,
  },
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
    ...likeResolvers.Mutation,
  },
};
