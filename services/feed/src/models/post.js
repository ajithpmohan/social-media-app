import { Schema, model } from 'mongoose';

const postSchema = new Schema(
  {
    body: { type: String, max_length: 2048, required: true },
    user: {
      id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
      username: { type: String, required: true },
    },
    comments: [
      {
        type: new Schema(
          {
            body: { type: String, max_length: 2048, required: true },
            user: {
              id: {
                type: Schema.Types.ObjectId,
                ref: 'users',
                required: true,
              },
              username: { type: String, required: true },
            },
          },
          { timestamps: true },
        ),
      },
    ],
    likes: [
      {
        type: new Schema(
          {
            user: {
              id: {
                type: Schema.Types.ObjectId,
                ref: 'users',
                required: true,
              },
              username: { type: String, required: true },
            },
          },
          { timestamps: true },
        ),
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

export default model('Post', postSchema, 'posts');
