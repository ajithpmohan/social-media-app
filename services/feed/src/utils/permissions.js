import { rule, shield } from 'graphql-shield';

const isAuthenticated = rule()((parent, args, { user }) => {
  return user !== null;
});

const permissions = shield(
  {
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
  },
  {
    // If you wish to see errors thrown inside resolvers,
    // you can set allowExternalErrors option to true.
    allowExternalErrors: true,
    fallbackError: Error('Authorization failed!'),
  },
);

export { permissions };
