import { Schema, model } from 'mongoose';

const postSchema = new Schema(
  {
    body: { type: String, max_length: 2048, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [
      {
        type: new Schema(
          {
            author: {
              type: Schema.Types.ObjectId,
              ref: 'User',
              required: true,
            },
          },
          { timestamps: { updatedAt: false } },
        ),
      },
    ],
  },
  {
    timestamps: true,
    // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toJSON: { virtuals: true },
    // So `toObject()` output includes virtuals
    toObject: { virtuals: true },
  },
);

postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false,
  match: { parent: null },
  // options: { sort: { name: -1 }, limit: 5 }
});

// Always populate the user field
const populateComments = function () {
  this.populate('comments');
};

postSchema
  .pre('find', populateComments)
  .pre('findOne', populateComments)
  .pre('findOneAndUpdate', populateComments);

export default model('Post', postSchema, 'posts');
