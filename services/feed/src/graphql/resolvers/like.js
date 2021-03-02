import { UserInputError } from 'apollo-server';
import { models } from '../../models';
import ensureAuth from '../../utils/ensure-auth';

export default {
  Mutation: {
    likePost: async (_, { feedId }, context) => {
      // verify auth token
      const { id: author } = await ensureAuth(context);

      const post = await models.Post.findById(feedId).catch((err) => {
        if (err.name === 'CastError') {
          throw new UserInputError('Post not found');
        }
      });
      if (!post) {
        throw new UserInputError('Post not found');
      }
      if (post.likes.find((like) => like.author.equals(author))) {
        post.likes = post.likes.filter((like) => !like.author.equals(author));
      } else {
        post.likes.push({ author });
      }

      await post.save();
      return post;
    },
    likeComment: async (_, { feedId }, context) => {
      // verify auth token
      const { id: author } = await ensureAuth(context);

      const comment = await models.Comment.findById(feedId).catch((err) => {
        if (err.name === 'CastError') {
          throw new UserInputError('Comment not found');
        }
      });

      if (!comment) {
        throw new UserInputError('Comment not found');
      }

      if (comment.likes.find((like) => like.author.equals(author))) {
        comment.likes = comment.likes.filter(
          (like) => !like.author.equals(author),
        );
      } else {
        comment.likes.push({ author });
      }

      await comment.save();
      return comment;
    },
  },
};
