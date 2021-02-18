import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
  {
    body: { type: String, max_length: 2048, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    ancestors: [
      { type: Schema.Types.ObjectId, ref: 'Comment', required: true },
    ],
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model('Comment', commentSchema, 'comments');
