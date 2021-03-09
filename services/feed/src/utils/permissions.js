import { rule, shield } from 'graphql-shield';

const isAuthenticated = rule()((parent, args, { user }) => {
  return user !== null;
});

const permissions = shield({
  Query: {
    getPosts: isAuthenticated,
    getPost: isAuthenticated,
    getComment: isAuthenticated,
  },
  Mutation: {
    createPost: isAuthenticated,
    deletePost: isAuthenticated,
    createComment: isAuthenticated,
    deleteComment: isAuthenticated,
    likePost: isAuthenticated,
    likeComment: isAuthenticated,
  },
});

export { permissions };
