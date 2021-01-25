import postResolvers from './post';
import commentResolvers from './comment';

export default {
  Post: {
    commentCount: (parent) => parent.comments.length,
    likeCount: (parent) => parent.likes.length,
  },
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
};
