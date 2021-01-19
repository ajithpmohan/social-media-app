import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      max_length: 32,
      required: true,
    },
    password: { type: String, required: true },
    isActive: { type: Boolean, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

userSchema.static('findByEmail', function (email) {
  return this.find({ email });
});

export default model('User', userSchema, 'users');
