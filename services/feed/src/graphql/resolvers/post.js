import { AuthenticationError, UserInputError } from 'apollo-server';
import { models } from '../../models';
import validateMessage from '../../utils/validator';

export default {
  Post: {
    author: (post) => {
      return { __typename: 'Profile', id: post.author };
    },
    likeCount: (post) => post.likes.length,
    commentCount: (post) => post.comments?.length || 0,
  },

  Query: {
    getPosts: async (_, {}, context) => {
      const posts = await models.Post.find().sort({ createdAt: -1 });
      return posts;
    },

    getPost: async (_, { postId }, context) => {
      const post = await models.Post.findById(postId).catch((err) => {
        if (err.name === 'CastError') {
          throw new UserInputError('Post not found');
        }
      });
      if (!post) {
        throw new UserInputError('Post not found');
      }
      return post;
    },
  },

  Mutation: {
    createPost: async (_, { body }, { user }) => {
      const author = user.id;

      // validate post data
      const { errors, valid } = validateMessage(body);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      body = body.trim();

      // create post
      const post = new models.Post({ body, author });

      await post.save();
      return post;
    },

    deletePost: async (_, { postId }, { user }) => {
      const author = user.id;
      const post = await models.Post.findById(postId).catch((err) => {
        if (err.name === 'CastError') {
          throw new UserInputError('Post not found');
        }
      });
      if (!post) {
        throw new UserInputError('Post not found');
      }

      // verify that authUser is the owner
      if (!post.author.equals(author)) {
        throw new AuthenticationError('Action not allowed');
      }

      await models.Comment.deleteMany({ post: post.id });
      await post.delete();

      return 'Post deleted successfully';
    },
  },
};
