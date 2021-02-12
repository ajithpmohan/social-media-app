import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, max_length: 48, required: true },
    email: { type: String, unique: true, max_length: 32, required: true },
    username: { type: String, unique: true, max_length: 32, required: true },
    password: { type: String, required: true },
    avatar: { data: Buffer, Contenttype: String },
    dob: { type: Date },
    isActive: { type: Boolean, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.dob = ret.dob?.toISOString() || '';
        ret.avatar = ret.avatar || '';
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  },
);

// userSchema.static('findByEmail', function (email) {
//   return this.find({ email });
// });

// userSchema.static('findByUsername', function (username) {
//   return this.find({ username });
// });

export default model('User', userSchema, 'users');
