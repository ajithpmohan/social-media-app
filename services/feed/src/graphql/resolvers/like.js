import { UserInputError } from 'apollo-server';
import { models } from '../../models';
import ensureAuth from '../../utils/ensure-auth';

export default {
  Mutation: {
    likePost: async (_, { postId }, context) => {
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
      if (post.likes.find((like) => like.author.equals(author))) {
        post.likes = post.likes.filter((like) => !like.author.equals(author));
      } else {
        post.likes.push({ author });
      }

      await post.save();
      return post;
    },
  },
};
