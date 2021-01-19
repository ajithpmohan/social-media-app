import { AuthenticationError } from 'apollo-server';
import { models } from '../../models';
import checkAuth from '../../utils/check-auth';

export default {
  Query: {
    getProfile: async (_, {}, context) => {
      const user = await checkAuth(context);

      const profile = await models.Profile.findOne({ user }).exec();
      if (!profile) {
        throw new AuthenticationError('No such Profile found');
      }
      return { ...profile.toJSON() };
    },
  },
  Mutation: {
    createUpdateProfile: async (
      _,
      { profileInput: { firstName, lastName, dob } },
      context,
    ) => {
      const user = await checkAuth(context);

      firstName = firstName.trim();
      lastName = lastName.trim();

      const profile = await models.Profile.findOneAndUpdate(
        { user },
        { firstName, lastName, dob },
        { new: true, upsert: true, runValidators: true },
      );
      return { ...profile.toJSON() };
    },
  },
};
