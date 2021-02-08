import { AuthenticationError } from 'apollo-server';
import axios from 'axios';

export default async ({
  req: {
    headers: { authorization },
  },
}) => {
  if (!authorization) {
    throw new AuthenticationError('Authentication header must be provided');
  }
  const { ACCOUNT_URL } = process.env;

  const { data } = await axios.post(
    `${ACCOUNT_URL}`,
    {
      query: `query {
        me {
          id
          username
        }
      } `,
    },
    { headers: { Authorization: authorization } },
  );

  const { errors } = data;
  if (errors?.length) {
    errors.map((err) => {
      if (err?.extensions?.code === 'UNAUTHENTICATED') {
        throw new AuthenticationError(err.message);
      }
    });
  }
  const {
    data: { me },
  } = data;
  return me;
};
