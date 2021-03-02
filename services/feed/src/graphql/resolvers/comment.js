import { AuthenticationError, UserInputError } from 'apollo-server';
import { models } from '../../models';
import ensureAuth from '../../utils/ensure-auth';
import validateMessage from '../../utils/validator';

export default {
  Comment: {
    author: (comment) => {
      return { __typename: 'Profile', id: comment.author };
    },
    post: async (comment) => {
      await comment.populate('post').execPopulate();
      return comment.post;
    },
    ancestors: async (comment) => {
      await comment.populate('ancestors').execPopulate();
      return comment.ancestors;
    },
    likeCount: (comment) => comment.likes.length,
    replies: async (comment) =>
      await models.Comment.find({ parent: comment.id }),
    repliesCount: async (comment) =>
      await models.Comment.count({ parent: comment.id }),
  },
  Query: {
    getComment: async (_, { commentId }, context) => {
      // verify auth token
      await ensureAuth(context);

      const comment = await models.Comment.findOne({ _id: commentId }).catch(
        (err) => {
          if (err.name === 'CastError') {
            throw new UserInputError('Comment not found');
          }
        },
      );
      if (!comment) {
        throw new UserInputError('Comment not found');
      }

      return comment;
    },
  },
  Mutation: {
    createComment: async (_, { postId, commentId = null, body }, context) => {
      /*
        if commentId then it's a reply to a comment
        otherwise it's a comment to a post
      */

      // verify auth token
      const { id: author } = await ensureAuth(context);

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

      // create comment
      const comment = new models.Comment({
        body,
        author,
        post,
      });

      if (commentId) {
        const parent = await models.Comment.findOne({
          _id: commentId,
          post,
        }).catch((err) => {
          if (err.name === 'CastError') {
            throw new UserInputError('Comment not found');
          }
        });

        if (!parent) {
          throw new UserInputError('Comment not found');
        }
        // create reply
        comment.parent = parent;

        const ancestors = parent.ancestors || [];
        ancestors.push(parent);

        comment.ancestors = ancestors;
      }

      await comment.save();

      return comment;
    },

    deleteComment: async (_, { postId, commentId }, context) => {
      // verify auth token
      const { id: author } = await ensureAuth(context);

      const post = await models.Post.findById(postId).catch((err) => {
        if (err.name === 'CastError') {
          throw new UserInputError('Post not found');
        }
      });
      if (!post) {
        throw new UserInputError('Post not found');
      }

      const comment = await models.Comment.findOne({
        _id: commentId,
        post,
      }).catch((err) => {
        if (err.name === 'CastError') {
          throw new UserInputError('Comment not found');
        }
      });
      if (!comment) {
        throw new UserInputError('Comment not found');
      }
      if (!comment.author.equals(author)) {
        throw new AuthenticationError('Action not allowed');
      }

      await models.Comment.deleteMany({
        post: comment.post.id,
        ancestors: { $in: comment.id },
      });
      await comment.delete();

      return 'Comment deleted successfully';
    },
  },
};
