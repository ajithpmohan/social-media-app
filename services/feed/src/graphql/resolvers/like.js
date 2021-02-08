import { UserInputError } from 'apollo-server';
import { models } from '../../models';
import ensureAuth from '../../utils/ensure-auth';

export default {
  Like: {
    user: (like) => {
      return { __typename: 'User', id: like.user };
    },
  },
  Mutation: {
    likePost: async (_, { postId }, context) => {
      // verify auth token
      const { id: user } = await ensureAuth(context);

      const post = await models.Post.findById(postId).catch((err) => {
        if (err.name === 'CastError') {
          throw new UserInputError('Post not found');
        }
      });
      if (!post) {
        throw new UserInputError('Post not found');
      }
      if (post.likes.find((like) => like.user.equals(user))) {
        post.likes = post.likes.filter((like) => !like.user.equals(user));
      } else {
        post.likes.push({ user });
      }

      await post.save();
      return post;
    },
  },
};
