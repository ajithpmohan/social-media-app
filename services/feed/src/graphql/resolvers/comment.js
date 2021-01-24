import { AuthenticationError, UserInputError } from 'apollo-server';
import { models } from '../../models';
import ensureAuth from '../../utils/ensure-auth';
import validateMessage from '../../utils/validator';

export default {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      // verify auth token
      const user = await ensureAuth(context);

      // validate post data
      const { errors, valid } = validateMessage(body);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      body = body.trim();

      const post = await models.Post.findById(postId).catch((err) => {
        if (err.name === 'CastError') {
          throw new UserInputError('Post not found');
        }
      });
      if (!post) {
        throw new UserInputError('Post not found');
      }

      post.comments.unshift({ body, user });
      await post.save();

      return post;
    },

    deleteComment: async (_, { postId, commentId }, context) => {
      // verify auth token
      const { id } = await ensureAuth(context);

      const post = await models.Post.findById(postId).catch((err) => {
        if (err.name === 'CastError') {
          throw new UserInputError('Post not found');
        }
      });
      if (!post) {
        throw new UserInputError('Post not found');
      }

      const commentIndex = post.comments.findIndex(
        (comment) => comment.id === commentId,
      );
      if (commentIndex === -1) {
        throw new AuthenticationError('Comment not found');
      }
      if (!post.comments[commentIndex]?.user.id.equals(id)) {
        throw new AuthenticationError('Action not allowed');
      }

      post.comments.splice(commentIndex, 1);
      await post.save();

      return post;
    },
  },
};
